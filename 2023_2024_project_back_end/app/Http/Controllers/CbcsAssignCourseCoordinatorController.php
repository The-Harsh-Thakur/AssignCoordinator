<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CbcsAssignCourseCoordinator;

class CbcsAssignCourseCoordinatorController extends Controller
{
    /**
     * Update the status of a course coordinator.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'sub_code' => 'required|string',
        ]);

        try {
            // Find the course coordinator by sub_code
            $coordinator = CbcsAssignCourseCoordinator::where('sub_code', $validatedData['sub_code'])->firstOrFail();
            
            // Update the status
            $coordinator->status = 2;
            $coordinator->save();

            // Return success response
            return response()->json(['message' => 'Status updated successfully'], 200);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return response()->json(['error' => 'Failed to update status'], 500);
        }
    }
}
