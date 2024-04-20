<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacultyList extends Model
{
    public $table = 'cbcs_assign_course_coordinatord';
    public $fillable = ['id', 'offered_to_name', 'sub_code', 'session', 'session_year', 'status', 'assigned']; // Fillable fields in the table
    // Add any relationships or additional methods as needed
}
