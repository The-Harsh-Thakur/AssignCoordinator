<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacultyList extends Model
{
    protected $table = 'cbcs_assign_course_coordinatord';
    protected $fillable = ['offered_to_name', 'sub_code', 'session', 'session_year', 'status']; // Fillable fields in the table
    // Add any relationships or additional methods as needed
}
