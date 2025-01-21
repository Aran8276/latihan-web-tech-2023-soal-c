<?php

use App\Http\Controllers\AcceptanceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DegreesController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\UniversitiesController;
use App\Http\Middleware\AuthorizedMiddleware;
use App\Http\Middleware\ManageMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/check', [AuthController::class, 'check']);
Route::get('/universities/index', [UniversitiesController::class, 'index']);
Route::get('/universities/search/{query}', [UniversitiesController::class, 'search']);
Route::get('/universities/get/{id}', [UniversitiesController::class, 'getById']);
Route::get('/universities/check-done/{university_id}', [AcceptanceController::class, 'checkAlreadyDone']);


Route::middleware(ManageMiddleware::class)->group(function () {
    // degrees
    Route::get('/degrees/get/{id}', [DegreesController::class, 'getById']);
    Route::get('/degrees/index', [DegreesController::class, 'index']);
    Route::post('/degrees/store', [DegreesController::class, 'store']);
    Route::put('/degrees/update/{id}', [DegreesController::class, 'update']);
    Route::delete('/degrees/delete/{id}', [DegreesController::class, 'delete']);

    // faculty
    Route::get('/faculty/get/{id}', [FacultyController::class, 'getById']);
    Route::get('/faculty/index', [FacultyController::class, 'index']);
    Route::post('/faculty/store', [FacultyController::class, 'store']);
    Route::put('/faculty/update/{id}', [FacultyController::class, 'update']);
    Route::delete('/faculty/delete/{id}', [FacultyController::class, 'delete']);

    // universities
    Route::post('/universities/store', [UniversitiesController::class, 'store']);
    Route::put('/universities/update/{id}', [UniversitiesController::class, 'update']);
    Route::delete('/universities/delete/{id}', [UniversitiesController::class, 'delete']);

    // apply or acceptances
    Route::get('/acceptance/index', [AcceptanceController::class, 'index']);
    Route::get('/acceptance/get/{id}', [AcceptanceController::class, 'getById']);
    Route::put('/acceptance/update/{id}', [AcceptanceController::class, 'update']);
    Route::delete('/acceptance/delete/{id}', [AcceptanceController::class, 'delete']);

    // user
    Route::get('/users/index', [AuthController::class, 'getAllUsers']);
    Route::get('/users/search/{query}', [AuthController::class, 'searchUser']);
    Route::get('/users/status/{status}', [AuthController::class, 'filterStatus']);
    Route::put('/users/update/{id}', [AuthController::class, 'updateUser']);
    Route::delete('/users/delete/{id}', [AuthController::class, 'deleteUser']);
});

Route::middleware(AuthorizedMiddleware::class)->group(function () {
    Route::get('/apply/list', [AcceptanceController::class, 'getAcceptanceList']);
    Route::post('/apply/{university_id}', [AcceptanceController::class, 'applyUniversity']);
});
