<?php

use Illuminate\Http\Request;

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

Route::post('/user/devices', 'APIController@retrieveUserDevices')->name('api_user_devices');
Route::post('/device/{id}', 'APIController@retrieveDeviceInfo')->name('api_device_info');