<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.26
 * Time: 14.11
 */

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class DeviceRepository implements DeviceRepositoryInterface
{

    public function getClosestDeviceIMEITo(float $latitude, float $logitude): ?string
    {
        $device = DB::table('devices')
            ->selectRaw(
            //Since we only want to find closest point and we don't want to know exact distance in kilometres
            //We can skip sqrt and pow parts in the calculation, and it still should be fine.
                "imei, 
                            111.111 * DEGREES(ACOS(LEAST(COS(RADIANS(latitude))
                             * COS(RADIANS(:lat))
                             * COS(RADIANS(longitude - :lng))
                             + SIN(RADIANS(latitude))
                             * SIN(RADIANS(:latt)), 1.0))) 
                             AS distance",
                [
                    'lat' => $latitude,
                    'latt' => $latitude, //It didnt allow for me to use same arg twice.
                    'lng' => $logitude
                ]
            )
            ->havingRaw('distance != 0')
            ->orderBy("distance")
            ->take(1)
            ->first();

        if ($device !== null)
            return $device->imei;

        return null;
    }

}