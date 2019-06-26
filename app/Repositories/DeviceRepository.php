<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.26
 * Time: 14.11
 */

namespace App\Repositories;

use App\Models\Device;
use Illuminate\Support\Facades\DB;

class DeviceRepository implements DeviceRepositoryInterface
{

    public function getClosestDeviceTo(float $latitude, float $logitude): ?Device
    {
        return DB::selectOne(
            DB::raw(
                "SELECT id, ST_Distance_Sphere(point(:lat :lng)), point(latitude, longitude)) AS distance FROM devices"
            )
        )->orderBy("distance")->setBindings(
            [
                'lat' => $latitude,
                'lng' => $logitude
            ]
        )->get();
    }

}