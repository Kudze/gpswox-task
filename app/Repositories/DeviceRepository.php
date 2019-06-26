<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.26
 * Time: 14.11
 */

namespace App\Repositories;

use App\Models\Device;
use App\Models\User;

class DeviceRepository implements DeviceRepositoryInterface {

    public function getClosestDeviceTo(float $latitude, float $logitude): ?Device
    {

    }

}