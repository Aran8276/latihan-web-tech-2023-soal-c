<?php

namespace App\Http\Controllers;

use App\Models\Degrees;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class DegreesController extends Controller
{
    public function index()
    {
        $data = Degrees::all();

        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'degree_name' => ['required', 'string', 'max:255'],
            'is_enabled' => ['required', 'boolean']
        ]);

        $id = Str::random(16);

        Degrees::create([
            "id" => $id,
            "degree_name" => $request->degree_name,
            "is_enabled" => $request->is_enabled,
        ]);

        return response()->json([
            "success" => true,
            "msg" => "ok, create " . $id
        ]);
    }

    public function update(Request $request, $id)
    {
        $degree = Degrees::where("id", $id)->first();
        if (!$degree) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $request->validate([
            'degree_name' => ['required', 'string', 'max:255'],
            'is_enabled' => ['required', 'boolean']
        ]);

        $degree->update($request->all());

        return response()->json([
            "success" => true,
            "msg" => "ok, update:" . $id
        ]);
    }

    public function delete($id)
    {
        $degree = Degrees::where("id", $id)->first();
        if (!$degree) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $degree->delete();

        return response()->json([
            "success" => true,
            "msg" => "ok, delete:" . $id
        ]);
    }

    public function getById($id)
    {
        $degree = Degrees::where("id", $id)->first();
        if (!$degree) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $degree,
        ]);
    }
}
