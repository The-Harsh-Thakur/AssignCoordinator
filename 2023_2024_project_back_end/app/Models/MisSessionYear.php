<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MisSessionYear extends Model
{
    protected $table = 'mis_session_year'; // Specify the table name if it's different from the model's name convention

    protected $fillable = [
        'session_year',
    ];

    // If your table has timestamps (created_at and updated_at columns), you can enable them with:
    // public $timestamps = true;

    // If your primary key is different from the default 'id' column, specify it like this:
    // protected $primaryKey = 'custom_id';

    // Define any relationships here if applicable
}

