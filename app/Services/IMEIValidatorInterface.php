<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.26
 * Time: 14.11
 */

namespace App\Services;


interface IMEIValidatorInterface {

    public function isIMEIValid(string $imei): bool;

}