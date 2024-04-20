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

        $faculty = FacultyList::select('id', 'offered_to_name', 'sub_code', 'session', 'session_year', 'assigned')->get();

        return response()->json($faculty);
    }

    public function updateAssign(Request $request, $id)
    {
        try {
            // Find the faculty member by ID
            $faculty = FacultyList::findOrFail($id);

            // Update the assigned attribute
            $faculty->assigned = $request->input('assigned');
            $faculty->save();

            // Return success response
            return response()->json(['message' => 'Faculty member assigned updated successfully'], 200);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return response()->json(['error' => 'Failed to update faculty member assigned status'], 500);
        }
    }
}
