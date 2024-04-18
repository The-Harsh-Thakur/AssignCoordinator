<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CbcsAssignCourseCoordinator extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cbcs_assign_course_coordinatord';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'status', // Add any other fillable attributes here if needed
    ];
}