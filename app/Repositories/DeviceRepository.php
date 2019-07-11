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

    public function getClosestDeviceIMEITo(float $latitude, float $longitude): ?string
    {
        $result = null;
        $minDist = 0;

        Device::select('longitude', 'latitude', 'imei')->chunk(
            500,
            //minDist and result is passed by reference.
            function ($devices) use ($latitude, $longitude, &$minDist, &$result) {
                foreach($devices as $device) {
                    $distance = $this->calculateLatLongDistance(
                        $latitude,
                        $longitude,
                        $device->latitude,
                        $device->longitude
                    );

                    if($distance < $minDist || $result === null)
                        $result = $device->imei;
                }
            }
        );

        return $result;
    }

    private function calculateLatLongDistance($lat1, $lng1, $lat2, $lng2) : float
    {
        $latFrom = deg2rad($lat1);
        $lonFrom = deg2rad($lng1);
        $latTo = deg2rad($lat2);
        $lonTo = deg2rad($lng2);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
                cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));

        //Since, this is only used for relative calculations and distance data from this repository,
        //won't be shown to user, we don't need to multiply to earth radius.
        return $angle;// * $earthRadius;
    }

}