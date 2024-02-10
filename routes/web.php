<?php

use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\WorkoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/workouts',[WorkoutController::class, 'index']);
Route::get('/workouts/{uniqueId}',[WorkoutController::class, 'show']);
Route::get('/workouts/{uniqueId}/ownedByUser',[WorkoutController::class, 'owned']);
Route::get('/workouts/{uniqueId}/test',[WorkoutController::class, 'showName']);

Route::post('/workouts/{uniqueId}/add',[WorkoutController::class, 'store']);
Route::patch('/workouts/{uniqueId}/patch',[WorkoutController::class, 'edit']);
Route::delete('/workouts/{uniqueId}/delete',[WorkoutController::class, 'remove']);
Route::get('/workoutsToday',[WorkoutController::class, 'showByDay']);
Route::get('/workoutsToday/type',[WorkoutController::class, 'showByType']);

Route::get('/statistics', [StatisticsController::class, 'statistics']);
Route::post('/suggestion', [WorkoutController::class, 'showSuggestion']);

require __DIR__.'/auth.php';
