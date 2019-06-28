<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.28
 * Time: 01.54
 */

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Config;

class GoogleGeo implements GeoInterface {
    private $googleAPIKey = "";
    private $http = null;

    public function __construct()
    {
        $this->googleAPIKey = Config::get("google.maps_api_key");
        $this->http = new Client();
    }

    public function latLongToAddress(float $lat, float $lng): string
    {
        $res = $this->http->request(
            "GET",
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=$lat,$lng&key=$this->googleAPIKey"
        );

        $json = json_decode($res->getBody());

        if(empty($json->results))
            return "Unknown";

        return $json->results[0]->formatted_address;
    }
}