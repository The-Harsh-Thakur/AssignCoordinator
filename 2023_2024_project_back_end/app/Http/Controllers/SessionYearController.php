<?php

namespace App\Http\Controllers;

use App\Models\MisSessionYear;
use Illuminate\Http\Request;

class SessionYearController extends Controller
{
    public function getSessionYears()
    {
        $sessionYears = MisSessionYear::select('id', 'session_year')->orderBy('session_year', 'desc')->get();
        return response()->json($sessionYears);
    }
}