<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function all(Request $request)
    {
        $teamIds = Auth::user()->teams()->pluck('teams.id')->ToArray();

        $tasks = Task::where('user_id', Auth::user()->id)
            ->orWhereIn('team_id',$teamIds)->with('team')->get();  
        return response()->json(['contents' => $tasks]);
    }

    public function show(Request $request, int $taskId)
    {
        $task = Task::where('id', "$taskId")->with(['user','team','comments'])->first();

        if (!$task) {
            return response()->json([
                'result' => 'failed',
                'message' => 'Task not found.',
            ]);
        }

        return response()->json([
            'result' => 'success',
            'message' => 'Task returned.',
            'contents' => $task,
        ]);
    }

    public function update(Request $request, int $taskId)
    {
        $task = Task::findOrFail($taskId);

        $updatable = ['status', 'title', 'description', 'due_date', 'team_id'];

        $data = $request->only($updatable);

        if (empty($data)) {
            return response()->json([
                'result' => 'failed',
                'message' => 'No updateable items specified.',
            ]);
        }

        $task->fill($data)->save();

        return response()->json([
            'result' => 'success',
            'message' => 'タスクを更新しました。',
        ]);
    }
}
