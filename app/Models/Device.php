<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('active');
    }

    /**
     * I wasnt really sure what is the best algorithm for this.
     * So just though up a new one.
     * But its fast enough.
     *
     * **Also for a big project this would go into repository but its not necceseary for this small scale project.
     */
    public function closestDevice() {

        //For context we want to get how many devices there is in the database.

    }
}
