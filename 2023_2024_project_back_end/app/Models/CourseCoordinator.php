<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseCoordinator extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'course_coordinator';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sub_code', 'offered_to_name',
    ];
}
