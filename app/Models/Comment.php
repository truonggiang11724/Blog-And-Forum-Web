<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //
    protected $fillable = [
        'post_id',
        'parent_id',
        'user_id',
        'content',
        'like_count',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
