<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:web');
        $this->middleware('role:admin');
    }

    public function index()
    {
        $devices = Device::paginate(20);

        return response()->view(
            "admin/home",
            [
                "devices" => $devices
            ]
        );
    }
}
