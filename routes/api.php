<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\AuthController;
use Stripe\Stripe;
use Stripe\Checkout\Session;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{category}', [ProductController::class , "getByCategories"]);
Route::get('/produits-limites', [ProductController::class, 'produitsLimites']);

// Google OAuth
Route::post('/google-login', [AuthController::class, 'googleLogin']);




Route::post('/create-checkout-session', function (Request $request) {
    \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

    $session = Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'mad',
                'product_data' => [
                    'name' => 'Commande Panier',
                ],
                'unit_amount' => $request->total * 100, // montant en centimes
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => env('FRONTEND_URL') . '/panier?paid=1',
        'cancel_url' => env('FRONTEND_URL') . '/panier?paid=0',
    ]);

    return response()->json(['id' => $session->id]);
});
