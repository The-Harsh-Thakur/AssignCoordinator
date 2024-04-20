<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FacultyList;

class FacultyStatController extends Controller
{

    public function updateFaculty(Request $request, $id)
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
