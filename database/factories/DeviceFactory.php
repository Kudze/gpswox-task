<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Device;
use Faker\Generator as Faker;

$factory->define(Device::class, function (Faker $faker) {
    $lat = $faker->latitude;
    $lng = $faker->longitude;

    return [
        'name' => $faker->word,
        'imei' => $faker->unique()->imei,
        'latitude' => $lat,
        'longitude' => $lng,
        'address' => "Seeded devices no address! I don't want to kill my API key!"
    ];
});
