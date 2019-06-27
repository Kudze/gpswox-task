<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('active');
    }

}
