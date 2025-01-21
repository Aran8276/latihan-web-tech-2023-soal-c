<?php

namespace App\Http\Controllers;

use App\Models\Acceptance;
use App\Models\Universities;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AcceptanceController extends Controller
{
    // manager role
    public function index()
    {
        $data = Acceptance::with(['universities', 'user'])->get();

        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', 'in:pending,accepted,declined'],
        ]);

        $acceptance = Acceptance::where("id", $id)->first();
        if (!$acceptance) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $acceptance->update($request->all());

        return response()->json([
            "success" => true,
            "msg" => "ok, update " . $id
        ]);
    }

    public function delete($id)
    {
        $acceptance = Acceptance::where("id", $id)->first();
        if (!$acceptance) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $acceptance->delete();

        return response()->json([
            "success" => true,
            "msg" => "ok, delete " . $id
        ]);
    }

    public function getById($id)
    {
        $acceptance = Acceptance::with(['universities', 'user'])->where("id", $id)->first();
        if (!$acceptance) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $acceptance,
        ]);
    }

    public function checkAlreadyDone($university_id)
    {
        $user = auth("sanctum")->user();
        $data = Acceptance::where("universities_id", $university_id)->where("user_id", $user->id)->first();

        if (!$data) {
            return response()->json([
                "success" => true,
                "payload" => false,
            ]);
        }

        return response()->json([
            "success" => true,
            "payload" => true,
        ]);
    }

    // member role
    public function applyUniversity($university_id)
    {
        $user = auth("sanctum")->user();
        $data = Acceptance::where("universities_id", $university_id)->where("user_id", $user->id)->first();

        if ($data) {
            return response()->json([
                "success" => false,
                "msg" => "sudah registrasi",
            ]);
        }

        $university = Universities::where("id", $university_id)->first();

        if (!$university) {
            return response()->json([
                "success" => false,
                "msg" => "uni not found " . $university_id
            ], 404);
        }

        $user = auth('sanctum')->user();
        $id = Str::random(16);

        Acceptance::create([
            "id" => $id,
            "user_id" => $user->id,
            "universities_id" => $university_id,
            "status" => "pending"
        ]);

        return response()->json([
            "success" => true,
            "msg" => "ok",
        ]);
    }

    public function getAcceptanceList()
    {
        $user = auth('sanctum')->user();

        $data = Acceptance::where("user_id", $user->id)->get();

        return response()->json([
            "success" => true,
            "data" => $data,
        ]);
    }
}
