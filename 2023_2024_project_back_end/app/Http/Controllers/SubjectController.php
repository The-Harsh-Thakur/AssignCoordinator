<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CbcsSubjectOfferedd;

class SubjectController extends Controller
{
    public function getSubjects(Request $request)
    {
        $sessionYear = $request->input('session_year');
        $session = $request->input('session');

        $subjects = CbcsSubjectOfferedd::where('session_year', $sessionYear)
                                       ->where('session', $session)
                                       ->get();

        return response()->json($subjects);
    }
}
