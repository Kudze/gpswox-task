<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Device;
use Faker\Generator as Faker;

$factory->define(Device::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'imei' => $faker->numberBetween(
            pow(10, 14),
            pow(10, 15) - 1
        ),
        'latitude' => $faker->latitude,
        'longitude' => $faker->longitude
    ];
});
