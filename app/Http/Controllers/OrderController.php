<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class OrderController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

        $items = $request->items;
        $lineItems = [];
        
        foreach ($items as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'mad',
                    'product_data' => [
                        'name' => $item['title'],
                    ],
                    'unit_amount' => $item['price'] * 100, // montant en centimes
                ],
                'quantity' => $item['quantity'],
            ];
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => env('FRONTEND_URL') . '/panier?paid=1&session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => env('FRONTEND_URL') . '/panier?paid=0',
            'metadata' => [
                'user_id' => auth()->id() ?? 'guest',
            ],
        ]);

        return response()->json(['id' => $session->id]);
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            
            // Récupérer les informations de la session
            $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
            $lineItems = $stripe->checkout->sessions->allLineItems($session->id);
            
            // Créer la commande
            $order = Order::create([
                'user_id' => $session->metadata->user_id !== 'guest' ? $session->metadata->user_id : null,
                'total_amount' => $session->amount_total / 100,
                'status' => 'paid',
                'payment_id' => $session->payment_intent,
                'shipping_address' => $session->shipping->address->line1 ?? null,
                'shipping_city' => $session->shipping->address->city ?? null,
                'shipping_postal_code' => $session->shipping->address->postal_code ?? null,
                'shipping_country' => $session->shipping->address->country ?? null,
            ]);
            
            // Enregistrer les articles de la commande
            foreach ($lineItems->data as $item) {
                $productName = $item->description;
                $product = Product::where('title', 'like', "%{$productName}%")->first();
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product ? $product->id : null,
                    'product_name' => $productName,
                    'quantity' => $item->quantity,
                    'price' => $item->amount_total / 100 / $item->quantity,
                ]);
            }
        }

        return response()->json(['success' => true]);
    }

    public function getUserOrders()
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        
        $orders = Order::with('items')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'date' => $order->created_at->format('Y-m-d'),
                    'status' => $this->translateStatus($order->status),
                    'total' => number_format($order->total_amount, 2),
                    'items_count' => $order->items->sum('quantity'),
                    'items' => $order->items->map(function ($item) {
                        return [
                            'name' => $item->product_name,
                            'quantity' => $item->quantity,
                            'price' => number_format($item->price, 2),
                        ];
                    }),
                ];
            });
        
        return response()->json(['orders' => $orders]);
    }

    private function translateStatus($status)
    {
        $translations = [
            'pending' => 'En attente',
            'processing' => 'En traitement',
            'paid' => 'Payé',
            'shipped' => 'Expédié',
            'delivered' => 'Livré',
            'cancelled' => 'Annulé',
        ];

        return $translations[$status] ?? $status;
    }
}