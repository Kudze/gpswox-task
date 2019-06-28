<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:web');
        $this->middleware('role:admin');
    }

    public function index($orderBy, $orderType)
    {
        $devices = Device::withCount("users")->orderBy($orderBy, $orderType)->paginate(50);

        return response()->view(
            "admin/home",
            [
                "devices" => $devices,
                "orderBy" => $orderBy,
                "orderType" => $orderType
            ]
        );
    }
}
