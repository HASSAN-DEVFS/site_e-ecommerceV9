<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavorisController; // Changé de WishlistController à FavorisController

// Routes d'authentification
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/google-login', [AuthController::class, 'googleLogin']);

// Route pour récupérer le profil utilisateur
Route::middleware(['auth:sanctum'])->get('/user', [AuthController::class, 'getUserProfile']);

// Routes pour les commandes
Route::post('/create-checkout-session', [OrderController::class, 'createCheckoutSession']);
Route::post('/webhook', [OrderController::class, 'handleWebhook']);
Route::get('/user/orders', [OrderController::class, 'getUserOrders'])->middleware('auth:sanctum');

// Routes pour les favoris
Route::get('/user/favoris', [FavorisController::class, 'getUserFavoris'])->middleware('auth:sanctum');
Route::post('/user/favoris/add', [FavorisController::class, 'addToFavoris'])->middleware('auth:sanctum');
Route::delete('/user/favoris/remove/{productId}', [FavorisController::class, 'removeFromFavoris'])->middleware('auth:sanctum');

// Routes pour les produits
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{category}', [ProductController::class, 'getByCategories']);
Route::get('/produits-limites', [ProductController::class, 'produitsLimites']);

