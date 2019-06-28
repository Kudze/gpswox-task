<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Device;
use Faker\Generator as Faker;

$factory->define(Device::class, function (Faker $faker, \App\Services\GeoInterface $geo) {
    $lat = $faker->latitude;
    $lng = $faker->longitude;

    return [
        'name' => $faker->word,
        'imei' => $faker->unique()->imei,
        'latitude' => $lat,
        'longitude' => $lng,
        'address' => $geo->latLongToAddress($lat, $lng)
    ];
});
