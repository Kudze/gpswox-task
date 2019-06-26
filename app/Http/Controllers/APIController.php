<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class APIController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Retrieves all user devices.
     */
    public function retrieveUserDevices()
    {
        /** @var User $user */
        $user = Auth::user();
        $data = $user->devices()->get();

        return response()->json(
            $data
        );
    }
}
