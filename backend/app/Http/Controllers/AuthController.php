<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // validation
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // register
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'is_active' => true,
            'password' => Hash::make($request->string('password')),
        ]);

        // login
        $token = $user->createToken("auth_token");

        // return response
        return response()->json([
            "success" => true,
            "token" => $token->plainTextToken,
        ]);
    }

    public function login(Request $request)
    {
        // validation
        $request->validate([
            'email' => ['required', 'max:255'],
            'password' => ['required'],
        ]);

        $fail_msg = [
            "success" => false,
            "msg" => "email atau password salah"
        ];

        // register
        $user = User::where("email", $request->email)->first();

        if (!$user) {
            return response()->json($fail_msg);
        }

        $password_match = Hash::check($request->password, $user->password);

        if (!$password_match) {
            return response()->json($fail_msg);
        }

        $token = $user->createToken("auth_token");

        return response()->json([
            "success" => true,
            "token" => $token->plainTextToken
        ]);
    }

    public function check()
    {
        $user = auth('sanctum')->user();
        return $user;
    }

    public function getAllUsers()
    {
        $user = User::all();

        return response()->json([
            "success" => true,
            "users" => $user,
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::where("id", $id)->first();

        if (!$user) {
            return response()->json([
                "success" => false,
                "msg" => "user not found"
            ]);
        }

        $user->delete();

        return response()->json([
            "success" => true,
            "msg" => "user deleted"
        ]);
    }

    public function searchUser($query)
    {
        $data = User::where("name", "like", '%' . $query . '%')->orWhere("email", "like", '%' . $query . '%')->get();

        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }

    public function filterStatus($status)
    {
        $data = User::where("is_active", $status)->get();
        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'is_active' => ['required'],
        ]);


        $user = User::where("id", $id)->first();
        if (!$user) {
            return response()->json([
                "success" => false,
                "msg" => "user not found " . $id
            ], 404);
        }

        $user->update($request->all());

        return response()->json([
            "success" => true,
            "msg" => "ok, update " . $id
        ]);
    }
}
