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

    public function viewDevice($id)
    {
        $device = Device::find($id);

        if($device === null)
            return response()->redirectToRoute("admin_home");

        $users = $device->users()->get();

        return response()->view(
            'admin/device',
            [
                'device' => $device,
                'users' => $users
            ]
        );
    }

    public function removeDeviceUser($id, $userID)
    {
        DB::table("device_user")->where(
            [
                ["device_id", $id],
                ["user_id", $userID]
            ]
        )->delete();

        return response()->redirectToRoute("admin_device", ["id" => $id]);
    }
}
