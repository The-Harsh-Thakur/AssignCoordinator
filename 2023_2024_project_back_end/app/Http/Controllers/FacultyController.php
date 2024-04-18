<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FacultyList;

class FacultyController extends Controller
{
    public function getFaculty(Request $request)
    {
        $subCode = $request->input('sub_code');
        $sessionYear = $request->input('session_year');
        $session = $request->input('session');

        $faculty = FacultyList::select('id', 'offered_to_name', 'sub_code', 'session', 'session_year', 'status')->get();

        return response()->json($faculty);
    }
}