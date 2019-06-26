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
                "imei, ABS(latitude - :lat) + ABS(longitude - :lng) AS distance",
                [
                    'lat' => $latitude,
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