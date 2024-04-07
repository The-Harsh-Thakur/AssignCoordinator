<?php

namespace App\Http\Controllers;

use App\Models\MisSession;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function getSession()
    {
        $session = MisSession::select('id', 'session')->get();
        return response()->json($session);
    }
}