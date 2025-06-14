<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favoris;
use App\Models\Product;

class FavorisController extends Controller
{
    /**
     * Récupérer la liste des favoris de l'utilisateur
     */
    public function getUserFavoris()
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        
        $favorisItems = Favoris::where('user_id', $user->id)
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
        
        return response()->json(['favoris' => $favorisItems]);
    }
    
    /**
     * Ajouter un produit aux favoris
     */
    public function addToFavoris(Request $request)
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);
        
        // Vérifier si le produit est déjà dans les favoris
        $exists = Favoris::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->exists();
            
        if ($exists) {
            return response()->json([
                'message' => 'Ce produit est déjà dans vos favoris'
            ]);
        }
        
        // Ajouter le produit aux favoris
        Favoris::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Produit ajouté à vos favoris'
        ]);
    }
    
    /**
     * Supprimer un produit des favoris
     */
    public function removeFromFavoris($productId)
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        
        $favorisItem = Favoris::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();
            
        if (!$favorisItem) {
            return response()->json([
                'error' => 'Produit non trouvé dans vos favoris'
            ], 404);
        }
        
        $favorisItem->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Produit supprimé de vos favoris'
        ]);
    }
}