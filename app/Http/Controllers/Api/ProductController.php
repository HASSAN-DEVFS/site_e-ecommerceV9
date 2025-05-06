<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return response()->json($products);
    }
    public function getByCategories($category) {
        $products = Product::where("category", $category)->get();
        return response()->json($products);
    }
    public function produitsLimites(){
        $categories = Product::select('category')->distinct()->limit(8)->pluck('category');

$products = collect();

foreach ($categories as $category) {
    $products->push(
        Product::where('category', $category)
            ->orderBy('created_at', 'desc') // Trie par la date de création décroissante
            ->first()
    );
}

        
        
        return response()->json($products);
    }
    
}
