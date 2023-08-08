<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use DB;
use Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);

            event(new Registered($user));

            /** @var User $user */
            $token = $user->createToken('main')->plainTextToken;
            DB::commit();
            return response(compact('user', 'token'));
        } catch (\Exception $e) {
            DB::rollback();
            return response(['message', $e->getMessage()], 422);
        }
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password is incorrect.'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function verify($userId, Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response(["msg" => "Invalid/Expired url provided."], 401);
        }
    
        $user = User::findOrFail($userId);
    
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }
    
        return redirect()->away(config('app.url').'dashboard');
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response(content: '', status: 204);
    }
}
