<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = [
        "imei", "name", "latitude", "longitude"
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('active');
    }

}
