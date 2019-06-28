<?php

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

Auth::routes();

Route::middleware('auth')->get('/', function () {
    return response()->redirectToRoute('home');
});
Route::get('/home', 'HomeController@index')->name('home');

Route::middleware(['auth', 'role:admin'])->get('/admin', function () {
    return response()->redirectToRoute("admin_home", ["orderBy" => "id", "orderType" => "asc"]);
});
Route::get('/admin/{orderBy}/{orderType}', 'AdminController@index')->name('admin_home');
