<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;

    protected $fillable = ['team_id', 'invited_user_id', 'inviter_user_id', 'status'];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function invitedUser()
    {
        return $this->belongsTo(User::class, 'invited_user_id');
    }

    public function inviter()
    {
        return $this->belongsTo(User::class, 'inviter_user_id');
    }
}
