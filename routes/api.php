<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\CommentController;
use App\Http\Controllers\api\PostController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/posts', PostController::class)->except(['index']);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/comments', CommentController::class)->except(['index']);
});
    Route::get('/comments', [CommentController::class, 'index']);
    Route::get('/posts', [PostController::class, 'index']);
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/signup', [AuthController::class, 'signup']);
