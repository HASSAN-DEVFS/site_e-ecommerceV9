<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;


Route::get('/', function () {
    return view('welcome');
});

// Route::get('/products', [ProductController::class, 'index']);
// Route::middleware('cors')->get('/products', [ProductController::class, 'index']);
// Route::get('/example', function () {
//     return response()->json(['message' => 'Hello world']);
// })->middleware('cors');
