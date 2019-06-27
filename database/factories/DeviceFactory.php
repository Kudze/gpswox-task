<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Device;
use Faker\Generator as Faker;

$factory->define(Device::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'imei' => $faker->unique()->imei,
        'latitude' => $faker->latitude,
        'longitude' => $faker->longitude
    ];
});
