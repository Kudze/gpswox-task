<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.28
 * Time: 01.52
 */

namespace App\Services;

interface GeoInterface {

    public function latLongToAddress(float $lat, float $lng): string;

}