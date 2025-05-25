<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Team;
use App\Models\Comment;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'title', 'description', 'due_datetime', 'user_id', 'team_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function team() {
        return $this->belongsTo(Team::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
