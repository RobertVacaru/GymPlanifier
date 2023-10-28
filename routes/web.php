<?php

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
Route::get('/workoutsToday',[WorkoutController::class, 'showByDay']);
Route::get('/workouts/ownedBy/{uniqueId}', [WorkoutController::class, 'showByOwner']);

require __DIR__.'/auth.php';
