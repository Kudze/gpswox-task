<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.26
 * Time: 14.11
 */

namespace App\Repositories;

use App\Models\Device;

interface DeviceRepositoryInterface {

    public function getClosestDeviceIMEITo(float $latitude, float $logitude) : ?string;

    /**
     * @param Collection $devices (devices)
     * @return array (Returns array of indexes from the pool)
     */
    public function getFurthestDevicesFromPool(array $devices) : array;

}