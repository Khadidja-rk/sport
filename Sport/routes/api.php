<?php

use App\Http\Controllers\CoachController;
use App\Http\Controllers\GymController;
use App\Http\Controllers\SaunaBookingController;
use App\Http\Controllers\SaunasController;
use App\Http\Controllers\SaunaTimeController;
use App\Http\Controllers\SportController;
use App\Http\Controllers\WeekController;
use App\Mail\SaunaMail;
use App\Models\Coach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/sport',[SportController::class , 'index']);
Route::get('/gym',[GymController::class , 'index']);
Route::post('/gym/delete',[GymController::class , 'destroy']);
Route::post('/gym',[GymController::class , 'create']);
Route::post('/gym/edit',[GymController::class , 'edit']);
Route::post('/gym/coach',[CoachController::class , 'create']);
Route::post('/gym/coach/edit',[CoachController::class , 'update']);
Route::post('/gym/coach/delete',[CoachController::class , 'destroy']);
Route::post('/sauna',[SaunasController::class , 'create']);
Route::get('/sauna',[SaunasController::class , 'index']);
Route::post('/sauna/delete',[SaunasController::class , 'destroy']);
Route::post('/sauna/edit',[SaunasController::class , 'edit']);
Route::post('/sauna/book',[SaunaBookingController::class , 'create']);
Route::get('/sauna/book',[SaunaBookingController::class , 'index']);
Route::post('/sauna/book/active',[SaunaBookingController::class , 'update']);
Route::get('/sauna/week',[WeekController::class , 'index']);


Route::post('/sauna/time',[SaunaTimeController::class , 'create']);
Route::get('/sauna/time',[SaunaTimeController::class , 'index']);
Route::get('/sauna/time/all',[SaunaTimeController::class , 'store']);
Route::post('/sauna/time/delete',[SaunaTimeController::class , 'destroy']);
Route::post('app/sauna/reserve',[SaunaBookingController::class , 'appReserve']);
Route::post('/sauna/update',[SaunaBookingController::class , 'edit']);
Route::post('/sauna/book/delete',[SaunaBookingController::class , 'destroy']);
Route::get('/app/sauna/time',[SaunaBookingController::class , 'show']);
