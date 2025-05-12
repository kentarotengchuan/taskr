<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Comment;

class CommentController extends Controller
{
    public function allOnTask(int $taskId) {
        $comments = Comment::where('task_id', $taskId)
        ->with('user')->get();

        return response()->json([
            'result' => 'success',
            'message' => 'Success to get comments.',
            'contents' => $comments,
        ]);
    }

    public function postOnTask(Request $request, int $taskId) {
        $user = Auth::user();
        $comment = Comment::create([
            'task_id' => $taskId,
            'user_id' => $user->id,
            'content' => $request->content,
        ]);

        if(!$comment) {
            return response()->json([
                'result' => 'failed',
                'message' => 'Posting comment failed.',
            ]);
        }

        return response()->json([
            'result' => 'success',
            'message' => 'Comment posted.',
        ]);
    }

    public function allOnTeam(int $teamId) {
        $comments = Comment::where('team_id', $teamId)
        ->with('user')->get();

        return response()->json([
            'result' => 'success',
            'message' => 'Success to get comments.',
            'contents' => $comments,
        ]);
    }

    public function postOnTeam(Request $request, int $teamId) {
        $user = Auth::user();
        $comment = Comment::create([
            'team_id' => $teamId,
            'user_id' => $user->id,
            'content' => $request->content,
        ]);

        if(!$comment) {
            return response()->json([
                'result' => 'failed',
                'message' => 'Posting comment failed.',
            ]);
        }

        return response()->json([
            'result' => 'success',
            'message' => 'Comment posted.',
        ]);
    }
}
