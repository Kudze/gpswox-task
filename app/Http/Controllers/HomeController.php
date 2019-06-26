<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Shows the application dashboard and sends token, which is used to authorize front-end requests.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = Auth::user();
        $token = Auth::guard("api")->login($user);
        $googleToken = Config::get("google.api_key");

        return view(
            'home',
            [
                'token' => $token,
                'googleAPIKey' => $googleToken
            ]
        );
    }
}
