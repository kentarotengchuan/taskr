<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Task;
use App\Models\Team;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['task_id', 'team_id', 'user_id', 'content'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function task() {
        return $this->belongsTo(Task::class);
    }

    public function team() {
        return $this->belongsTo(Team::class);
    }
}
