<?php

use Illuminate\Database\Seeder;

const DEVICE_COUNT = 100000;
const USER_COUNT = 50;
const DEVICE_PER_USER_COUNT = 5000;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\User::class, USER_COUNT)->create();
        factory(App\Models\Device::class, DEVICE_COUNT)->create();

        $devices = App\Models\Device::all();

        App\Models\User::all()->each(
            function ($user) use ($devices) {
            $user->devices()->attach(
                $devices->random(DEVICE_PER_USER_COUNT)->pluck('id')->toArray()
            );
        });
    }
}
