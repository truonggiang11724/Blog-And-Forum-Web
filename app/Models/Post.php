<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'content',
        'thumbnail',
        'status',
        'published_at'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function comment(){
        return $this->hasMany(Comment::class);
    }

    public function scopeSearch($query, $keyword){
        return $query->where(function ($q) use ($keyword){
            $q->where('title', 'LIKE', "%{$keyword}%")
            ->orWhere('content', 'LIKE', "%{$keyword}%");
        });
    }

    public function scopeCategory($query, $categories){
        return $query->whereIn('category_id',$categories);
    }

}
