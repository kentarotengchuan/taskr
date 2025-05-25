<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// ✅ セッションベースの認証（Sanctum）用ルート（ログイン）
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/register',[AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout',[AuthController::class,'logout']);
});

// ✅ 認証済みユーザー用ルート（要: auth:sanctum）
Route::middleware(['auth:sanctum','verified'])->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::put('/user', [AuthController::class, 'edit']);
    Route::get('/users', [AuthController::class, 'search']);

    Route::get('/task', [TaskController::class, 'all']);
    Route::post('/task', [TaskController::class, 'create']);
    Route::get('/task/{taskId}', [TaskController::class, 'show']);
    Route::post('/task/{taskId}', [TaskController::class, 'update']);

    Route::get('/task/{taskId}/comments', [CommentController::class, 'allOnTask']);
    Route::post('/task/{taskId}/comments', [CommentController::class, 'postOnTask']);

    Route::get('/team', [TeamController::class, 'all']);
    Route::get('/team/{teamId}', [TeamController::class, 'show']);
    Route::get('/team/{teamId}/tasks', [TeamController::class, 'tasks']);

    Route::get('/team/{teamId}/invitations', [TeamController::class, 'invitations']);
    Route::post('/team/{teamId}/invitations', [TeamController::class, 'createInvitation']);
    Route::delete('/team/{teamId}/invitations', [TeamController::class, 'reject']);

    Route::get('/team/{taskId}/comments', [CommentController::class, 'allOnTeam']);
    Route::post('/team/{teamId}/comments', [CommentController::class, 'postOnTeam']);

    Route::post('/team/{teamId}/users', [TeamController::class, 'accept']);
});
