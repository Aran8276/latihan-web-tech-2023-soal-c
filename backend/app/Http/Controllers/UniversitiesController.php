<?php

namespace App\Http\Controllers;

use App\Models\Degrees;
use App\Models\Faculty;
use Illuminate\Support\Str;
use App\Models\Universities;
use App\Models\UniversitiesCost;
use Illuminate\Http\Request;

class UniversitiesController extends Controller
{
    public function index()
    {
        $data = Universities::with(['cost'])->get();

        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "name" => ['required', 'string', 'max:255'],
            "overview" => ['required', 'string', 'max:4096'],
            "tel" => ['required', 'string', 'max:64'],
            "email" => ['required', 'string', 'max:64'],
            "website" => ['required', 'string', 'max:255'],
            "address" => ['required', 'string', 'max:2048'],
            "accreditation" => ['required'],
            "category" => ['required'],
            "faculty" => ['required'],
            "degree" => ['required'],

            "registration_cost" => ['required', 'numeric', 'max:2000000000'],
            "time_minutes" => ['required', 'numeric', 'max:500']

        ]);

        $id = Str::random(16);

        Universities::create([
            "id" => $id,
            "name" => $request->name,
            "overview" => $request->overview,
            "tel" => $request->tel,
            "email" => $request->email,
            "website" => $request->website,
            "address" => $request->address,
            "accreditation" => $request->accreditation,
            "category" => $request->category,
            "faculty" => json_encode($request->faculty),
            "degree" => json_encode($request->degree),
        ]);

        UniversitiesCost::create([
            "id" => Str::random(16),
            "universities_id" => $id,
            "registration_cost" => $request->registration_cost,
            "time_minutes" => $request->time_minutes,
        ]);

        return response()->json([
            "success" => true,
            "msg" => "ok, create " . $id
        ]);
    }

    public function update(Request $request, $id)
    {
        $universities = Universities::where("id", $id)->first();
        $universities_cost = UniversitiesCost::where('universities_id', $id)->first();

        if (!$universities) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        if (!$universities_cost) {
            UniversitiesCost::create([
                "id" => Str::random(16),
                "universities_id" => $id,
                "registration_cost" => $request->registration_cost,
                "time_minutes" => $request->time_minutes,
            ]);
        }

        $request->validate([
            "name" => ['required', 'string', 'max:255'],
            "overview" => ['required', 'string', 'max:4096'],
            "tel" => ['required', 'string', 'max:64'],
            "email" => ['required', 'string', 'max:64'],
            "website" => ['required', 'string', 'max:255'],
            "address" => ['required', 'string', 'max:2048'],
            "accreditation" => ['required'],
            "category" => ['required'],
            "faculty" => ['required'],
            "degree" => ['required'],

            "registration_cost" => ['required', 'numeric', 'max:2000000000'],
            "time_minutes" => ['required', 'numeric', 'max:500']
        ]);

        $universities->update($request->all());
        $universities_cost->update($request->all());

        return response()->json([
            "success" => true,
            "msg" => "ok, update:" . $id
        ]);
    }

    public function delete($id)
    {
        $universities = Universities::where("id", $id)->first();
        if (!$universities) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $universities->delete();

        return response()->json([
            "success" => true,
            "msg" => "ok, delete:" . $id
        ]);
    }

    public function getById($id)
    {
        $universities = Universities::with(['cost', 'acceptance'])->where("id", $id)->first();
        if (!$universities) {
            return response()->json([
                "success" => false,
                "msg" => "not found " . $id
            ], 404);
        }

        $faculties = [];
        $degrees = [];

        /*
        $universities->faculty;
        $universities->degree;
        */

        foreach (json_decode($universities->faculty) as $item) {
            $foreign_faculty = Faculty::where("id", $item)->first();
            $faculties[] = $foreign_faculty;
        }

        foreach (json_decode($universities->degree) as $item) {
            $foreign_degree = Degrees::where("id", $item)->first();
            $degrees[] = $foreign_degree;
        }

        $universities->faculty_data = $faculties;
        $universities->degree_data = $degrees;

        return response()->json([
            "success" => true,
            "data" => $universities,
        ]);
    }

    public function search($query)
    {
        $data = Universities::where("name", "like", '%' . $query . '%')->get();

        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }
}
