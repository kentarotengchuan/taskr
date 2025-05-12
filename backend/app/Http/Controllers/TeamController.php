<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    public function all(Request $request)
    {
        $user = Auth::user();

        $teams = $user->teams()->with('owner')->get();

        return response()->json(['contents' => $teams]);
    }

    public function show(Request $request, int $teamId)
    {
        $team = Team::where('id', $teamId)->with(['owner','users','tasks', 'comments'])->first();

        if (!$team) {
            return response()->json([
                'result' => 'failed',
                'message' => 'Team not found.',
            ]);
        }

        return response()->json([
            'result' => 'success',
            'message' => 'Team returned.',
            'contents' => $team,
        ]);
    }

    public function tasks(Request $request, int $teamId) {
        $team = Team::where('id', $teamId)->first();
        $tasks = $team->tasks()->get();

        return response()->json([
            'result' => 'success',
            'message' => 'Tasks returned.',
            'contents' => $tasks,
        ]);
    }
}
