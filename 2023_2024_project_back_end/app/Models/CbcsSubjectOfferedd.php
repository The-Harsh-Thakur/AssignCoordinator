<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CbcsSubjectOfferedd extends Model
{
    //
    public $table = 'cbcs_subject_offeredd';
    public $fillable = ['id', 'session_year', 'session', 'sub_name', 'sub_code', 'sub_type', 'assigned']; // Fillable fields in the table
    // Add any relationships or additional methods as needed
    public $timestamps = false;
}
