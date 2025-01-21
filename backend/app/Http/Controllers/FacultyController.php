<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index()
    {
        $data = Faculty::all();

        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'faculty_name' => ['required', 'string', 'max:255'],
            'is_enabled' => ['required', 'boolean']
        ]);

        $id = Str::random(16);

        Faculty::create([
            "id" => $id,
            "faculty_name" => $request->faculty_name,
            "is_enabled" => $request->is_enabled,
        ]);

        return response()->json([
            "success" => true,
            "msg" => "ok, create " . $id
        ]);
    }

    public function update(Request $request, $id)
    {
        $faculty = Faculty::where("id", $id)->first();
        if (!$faculty) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $request->validate([
            'faculty_name' => ['required', 'string', 'max:255'],
            'is_enabled' => ['required', 'boolean']
        ]);

        $faculty->update($request->all());

        return response()->json([
            "success" => true,
            "msg" => "ok, update:" . $id
        ]);
    }

    public function delete($id)
    {
        $faculty = Faculty::where("id", $id)->first();
        if (!$faculty) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $faculty->delete();

        return response()->json([
            "success" => true,
            "msg" => "ok, delete:" . $id
        ]);
    }

    public function getById($id)
    {
        $faculty = Faculty::where("id", $id)->first();
        if (!$faculty) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $faculty,
        ]);
    }
}
