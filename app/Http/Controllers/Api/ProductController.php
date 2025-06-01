<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request){
        // Ajout d'un log pour déboguer
        \Log::info('Requête de produits reçue', ['limit' => $request->limit]);
        
        // Si un paramètre limit est fourni, limiter le nombre de produits
        if ($request->has('limit')) {
            $products = Product::limit($request->limit)->get();
        } else {
            $products = Product::all();
        }
        
        // Log du nombre de produits renvoyés
        \Log::info('Produits renvoyés', ['count' => count($products)]);
        
        return response()->json($products);
    }
    
    public function getByCategories($category) {
        // Ajout d'un log pour déboguer
        \Log::info('Requête de produits par catégorie', ['category' => $category]);
        
        $products = Product::where("category", $category)->get();
        
        // Log du nombre de produits renvoyés
        \Log::info('Produits renvoyés pour la catégorie', [
            'category' => $category, 
            'count' => count($products)
        ]);
        
        return response()->json($products);
    }
    
    public function produitsLimites(){
        $categories = Product::select('category')->distinct()->limit(8)->pluck('category');

        $products = collect();

        foreach ($categories as $category) {
            $products->push(
                Product::where('category', $category)
                    ->orderBy('created_at', 'desc')
                    ->first()
            );
        }
        
        return response()->json($products);
    }
}

