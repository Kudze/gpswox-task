<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.26
 * Time: 14.11
 */

namespace App\Repositories;

use App\Models\Device;

class DeviceRepository implements DeviceRepositoryInterface
{

    public function getClosestDeviceIMEITo(float $latitude, float $longitude): ?string
    {
        $result = null;
        $minDist = 0;

        Device::select('longitude', 'latitude', 'imei')->chunk(
            500,
            function ($devices) use ($latitude, $longitude, &$minDist, &$result) {
                foreach($devices as $device) {
                    $distance = $this->calculateLatLongDistance(
                        $latitude,
                        $longitude,
                        $device->latitude,
                        $device->longitude
                    );

                    if($distance < $minDist || $result === null) {
                        $result = $device->imei;
                        $minDist = $distance;
                    }
                }
            }
        );

        return $result;
    }

    public function getFurthestDevicesFromPool(array $devices): array
    {
        $furthestPair = [];
        $furthestDist = null;

        $deviceCount = count($devices);
        foreach($devices as $deviceIndex => $device) {
            for($i = $deviceIndex + 1; $i < $deviceCount; $i++) {
                $device2 = $devices[$i];

                $dist = $this->calculateLatLongDistance(
                    $device["latitude"],
                    $device["longitude"],
                    $device2["latitude"],
                    $device2["longitude"]
                );

                if($furthestDist === null || $furthestDist < $dist) {
                    $furthestDist = $dist;
                    $furthestPair = [$deviceIndex, $i];
                }
            }
        }

        return $furthestPair;
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