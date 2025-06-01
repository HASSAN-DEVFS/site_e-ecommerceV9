<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;

// Routes d'authentification
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/google-login', [AuthController::class, 'googleLogin']);

// Route pour récupérer le profil utilisateur (accepte session ou token)
Route::middleware(['auth:sanctum'])->get('/user', [AuthController::class, 'getUserProfile']);

// Route pour mettre à jour le profil utilisateur
Route::post('/profile/update', [AuthController::class, 'updateProfile'])->middleware('auth:sanctum');

// Route de test pour vérifier l'authentification
Route::middleware(['auth:sanctum'])->get('/auth-check', function() {
    return response()->json(['message' => 'Authentifié avec succès', 'user' => auth()->user()]);
});

// Route de test sans authentification pour le débogage
Route::get('/test', function() {
    return response()->json(['message' => 'API fonctionne correctement']);
});




// Routes pour les commandes
Route::post('/create-checkout-session', [OrderController::class, 'createCheckoutSession']);
Route::post('/webhook', [OrderController::class, 'handleWebhook']);
Route::get('/user/orders', [OrderController::class, 'getUserOrders'])->middleware('auth:sanctum');

// Routes pour les favoris
Route::get('/user/wishlist', [WishlistController::class, 'getUserWishlist'])->middleware('auth:sanctum');
Route::post('/user/wishlist/add', [WishlistController::class, 'addToWishlist'])->middleware('auth:sanctum');
Route::delete('/user/wishlist/remove/{productId}', [WishlistController::class, 'removeFromWishlist'])->middleware('auth:sanctum');

// Routes pour les produits
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{category}', [ProductController::class, 'getByCategories']);
Route::get('/produits-limites', [ProductController::class, 'produitsLimites']);










