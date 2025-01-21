<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ManageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $is_logged_in = auth('sanctum')->check();

        if (!$is_logged_in) {
            return response()->json([
                "success" => false,
                "msg" => "unauthorized"
            ], 401);
        }

        $user = auth('sanctum')->user();

        if ($user->role !== "manager") {
            return response()->json([
                "success" => false,
                "msg" => "forbidden"
            ], 403);
        }

        return $next($request);
    }
}
