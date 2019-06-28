<?php

namespace App\Providers;

use App\Services\GeoInterface;
use App\Services\GoogleGeo;
use App\Services\IMEIValidator;
use App\Services\IMEIValidatorInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            IMEIValidatorInterface::class,
            IMEIValidator::class
        );

        $this->app->bind(
            GeoInterface::class,
            GoogleGeo::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
