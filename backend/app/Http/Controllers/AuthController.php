<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Auth\Events\Registered;
use \Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        try {
            $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            ]);

            auth('web')->login($user);

            event(new Registered($user));

            return response()->json(['result' => 'success', 'message' => 'New user registered.']);
        } catch(\Exception $e) {
            return response()->json(['result' => 'failed', 'message' => $e->getMessage()], 401);
        }
    }

    public function getLogin(){
        return response()->json(['message' => 'ログイン画面へ']);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!Auth::guard('web')->attempt($credentials)) {
            return response()->json(['result' => 'failed', 'message' => 'login failed.'], 401);
        }

        $user = auth()->user();

        return response()->json(['result' => 'success', 'message' => 'login done.']);
    }

    public function logout(Request $request)
    {
        try {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['result' => 'success','message' => 'logout done.']);
        } catch(\Exception $e) {
            return response()->json(['result' => 'failed','message' => $e->getMessage()], 401);
        }
    }

    public function me(Request $request)
    {
        return response()->json(['user' => Auth::user()]);
    }

    public function verify(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect('http://localhost:3000/dashboard');
    }

    public function resend(Request $request)
    {
        try {
            if ($request->user()->hasVerifiedEmail()) {
                return response()->json(['result' => 'failed', 'message' => 'Already verified']);
            }

            $request->user()->sendEmailVerificationNotification();

            return response()->json(['result' => 'success', 'message' => 'Verification link sent']);
        } catch(\Exception $e) {
            return response()->json(['result' => 'failed', 'message' => 'Sending verification link failed'], 401);
        }
    }
}
