<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Product;

class WishlistController extends Controller
{
    /**
     * Récupérer la liste de souhaits de l'utilisateur
     */
    public function getUserWishlist()
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        
        $wishlistItems = Wishlist::where('user_id', $user->id)
            ->with('product')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->product->id,
                    'title' => $item->product->title,
                    'price' => $item->product->price,
                    'image' => $item->product->image,
                    'added_at' => $item->created_at->format('Y-m-d')
                ];
            });
        
        return response()->json(['wishlist' => $wishlistItems]);
    }
    
    /**
     * Ajouter un produit à la liste de souhaits
     */
    public function addToWishlist(Request $request)
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);
        
        // Vérifier si le produit est déjà dans la liste de souhaits
        $exists = Wishlist::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->exists();
            
        if ($exists) {
            return response()->json([
                'message' => 'Ce produit est déjà dans votre liste de souhaits'
            ]);
        }
        
        // Ajouter le produit à la liste de souhaits
        Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Produit ajouté à votre liste de souhaits'
        ]);
    }
    
    /**
     * Supprimer un produit de la liste de souhaits
     */
    public function removeFromWishlist($productId)
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        
        $wishlistItem = Wishlist::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();
            
        if (!$wishlistItem) {
            return response()->json([
                'error' => 'Produit non trouvé dans votre liste de souhaits'
            ], 404);
        }
        
        $wishlistItem->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Produit supprimé de votre liste de souhaits'
        ]);
    }
}