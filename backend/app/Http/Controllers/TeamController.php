<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Invite;
use Illuminate\Support\Facades\Auth;
use App\Models\TeamUser;


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
        $user = Auth::user();
        if (!$user || !$user->teams->contains('id', $teamId)) {
            return response()->json([
                'result' => 'failed',
                'message' => 'You did not joined this team.',
            ]);
        }
        
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

    public function invitations(Request $request, int $teamId) {
        try {
            $invitations = Invite::where('team_id', $teamId)
                ->where('status', 'pending')
                ->with('invitedUser')
                ->get();

            return response()->json([
                'result' => 'success',
                'message' => 'Invitations returned.',
                'contents' => $invitations,
            ]);
        } catch (\Exceprion $e) {
            return response()->json([
                'result' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }  
    }

    public function create(Request $request) {
        try {
            $team = Team::create([
                'name' => $request->title,
                'description' => $request->description,
                'owner_id' => Auth::id(),
            ]);

            TeamUser::create([
                'team_id' => $team->id,
                'user_id' => Auth::id(),
                'role' => 'owner',
            ]);

            foreach ($request->ids as $id) {
                Invite::create([
                    'team_id' => $team->id,
                    'invited_user_id' => $id,
                    'inviter_user_id' => Auth::id(),
                    'status' => 'pending',
                ]);
            }

            return response()->json([
                'result' => 'success',
                'message' => 'Team created.',
                'contents' => $team,
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'result' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function createInvitation(Request $request, int $teamId) {
        try {
            $inviterId = Auth::user()->id;
            $invitedId = $request->userId;

            $invitation = Invite::create([
                'team_id' => $teamId,
                'invited_user_id' => $invitedId,
                'inviter_user_id' => $inviterId,
                'status' => 'pending',
            ]);

            return response()->json([
                'result' => 'success',
                'message' => 'Invitation created.',
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'result' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }      
    }

    public function accept(Request $request, int $teamId) {
        try {
            TeamUser::create([
                'team_id' => $teamId,
                'user_id' => Auth::id(),
                'role' => 'member',
            ]);

            Invite::where('team_id',$teamId)
                ->where('invited_user_id', Auth::id())
                ->delete();

            return response()->json([
                'result' => 'success',
                'message' => 'Member joined.',
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'result' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function reject(Request $request, int $teamId) {
        try {
            Invite::where('team_id',$teamId)
                ->where('invited_user_id', Auth::id())
                ->delete();

            return response()->json([
                'result' => 'success',
                'message' => 'Invitation rejected.',
            ]);
        } catch(\Exception $e) {
            return response()->json([
                'result' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }
    }
}
