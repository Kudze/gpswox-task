<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 19.6.26
 * Time: 14.11
 */

namespace App\Services;


class IMEIValidator implements IMEIValidatorInterface {

    private function isLUHN($n) {
        $str = '';

        foreach (str_split(strrev((string) $n)) as $i => $d) {
            $str .= $i %2 !== 0 ? $d * 2 : $d;
        }

        return array_sum(str_split($str)) % 10 === 0;
    }

    public function isIMEIValid(string $n): bool
    {
        return $this->isLUHN($n) && strlen($n) == 15;
    }

}