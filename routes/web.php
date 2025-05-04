<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/products', [ProductController::class, 'index']);
// Route::middleware('cors')->get('/products', [ProductController::class, 'index']);
// Route::get('/example', function () {
//     return response()->json(['message' => 'Hello world']);
// })->middleware('cors');




// redirection initiale vers Google
Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);

// callback OAuth2 (méthode GET)
Route::get('/auth/google/callback',  [AuthController::class, 'handleGoogleCallback']);