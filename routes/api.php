<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('email/verify/{id}', [AuthController::class, 'verify'])->name('verification.verify'); // Make sure to keep this as your route name

Route::middleware('auth:sanctum')->group(function() {
    // resend verification email
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
     
        return response(['message' => 'Verification link sent!'], 201);
    })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', \App\Http\Controllers\UserController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
});
