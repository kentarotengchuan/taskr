<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Models\Comment;

class TaskController extends Controller
{
    public function all(Request $request)
    {
        $teamIds = Auth::user()->teams()->pluck('teams.id')->ToArray();

        $tasks = Task::where('user_id', Auth::user()->id)
            ->orWhereIn('team_id',$teamIds)->with('team')->get();  
        return response()->json(['contents' => $tasks]);
    }

    public function create(Request $request)
    {
        try {
            $task = Task::create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'due_datetime' => $request->date('due_datetime'),
                'user_id' => Auth::user()->id,
                'team_id' => (int)$request->input('team_id') == 0 ? null : (int)$request->input('team_id'),
            ]);

            Comment::create([
                'task_id' => $task->id,
                'team_id' => $task->team_id,
                'user_id' => 1,
                'content' => 'タスク『'.$task->title.'』が作成されました。',
            ]);

            return response()->json([
                'result' => 'success',
                'message' => 'task created.',
                'contents' => $task->id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'result' => 'failed',
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function show(Request $request, int $taskId)
    {
        $user = Auth::user();
        if (!$user || !$user->tasks->contains('id', $taskId)) {
            return response()->json([
                'result' => 'failed',
                'message' => 'You did not joined this task.',
            ]);
        }

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

        $updatable = ['status', 'title', 'description', 'due_datetime', 'team_id'];

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
