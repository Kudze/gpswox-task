<?php

namespace App\Providers;

use Faker\Factory;
use Faker\Provider\Base;
use Illuminate\Support\ServiceProvider;

class FakerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Faker', function($app) {
            $faker = Factory::create();
            $newClass = new class($faker) extends Base {
                public function imei()
                {
                    $code = $this->generator->numberBetween(
                        pow(10, 13),
                        pow(10, 14) - 1
                    );

                    $position = 0;
                    $total = 0;
                    while ($position < 14) {
                        if ($position % 2 == 0) {
                            $prod = 1;
                        } else {
                            $prod = 2;
                        }
                        $actualNum = $prod * $code[$position];
                        if ($actualNum > 9) {
                            $strNum = strval($actualNum);
                            $total += $strNum[0] + $strNum[1];
                        } else {
                            $total += $actualNum;
                        }
                        $position++;
                    }
                    $last = 10 - ($total % 10);
                    if ($last == 10) {
                        $imei = $code . 0;
                    } else {
                        $imei = $code . $last;
                    }
                    return $imei;
                }
            };

            $faker->addProvider($newClass);
            return $faker;
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
