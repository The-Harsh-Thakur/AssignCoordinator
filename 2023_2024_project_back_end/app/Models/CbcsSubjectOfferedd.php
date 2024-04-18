<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CbcsSubjectOfferedd extends Model
{
    protected $table = 'cbcs_subject_offeredd';
    protected $fillable = ['session_year', 'session', 'sub_name', 'sub_code', 'sub_type']; // Fillable fields in the table
    // Add any relationships or additional methods as needed
}
