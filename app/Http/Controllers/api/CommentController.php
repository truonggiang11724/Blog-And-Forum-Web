<?php

namespace App\Http\Controllers\api;

use App\Models\Comment;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $post_id = $request->post_id;
        $comments = Comment::with('user')->where('post_id', $post_id)->get();
        return CommentResource::collection($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        //
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $comment = Comment::create($data);
        return response(new CommentResource($comment),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
        return new CommentResource($comment->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
        $data = $request->validated();
        $comment->update($data);
        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
        $comment->delete();
        return response(['message' => 'Đã xóa bình luận']);
    }
}
