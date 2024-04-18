<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseCoordinator;

class CoordinatorController extends Controller
{
    /**
     * Assign course coordinator.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function assignCoordinator(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'sub_code' => 'required|string',
            'offered_to_name' => 'required|string',
        ]);

        try {
            // Create a new CourseCoordinator instance
            $coordinator = new CourseCoordinator();
            $coordinator->sub_code = $validatedData['sub_code'];
            $coordinator->offered_to_name = $validatedData['offered_to_name'];
            $coordinator->save();

            // Update status to 2 in cbcs_assign_course_coordinatord table
            \DB::table('cbcs_assign_course_coordinatord')
                ->where('sub_code', $validatedData['sub_code'])
                ->update(['status' => 2]);

            // Return success response
            return response()->json(['message' => 'Course coordinator assigned successfully'], 200);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return response()->json(['error' => 'Failed to assign course coordinator'], 500);
        }
    }

    /**
     * Update status to 2.
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
            // Update status to 2 in cbcs_assign_course_coordinatord table
            \DB::table('cbcs_assign_course_coordinatord')
                ->where('sub_code', $validatedData['sub_code'])
                ->update(['status' => 2]);

            // Return success response
            return response()->json(['message' => 'Status updated successfully'], 200);
        } catch (\Exception $e) {
            // Return error response if an exception occurs
            return response()->json(['error' => 'Failed to update status'], 500);
        }
    }
}
