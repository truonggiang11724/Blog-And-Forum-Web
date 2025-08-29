<?php

namespace App\Http\Controllers\api;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $query= Post::query()->with('category');
        if($request->search) $query->search($request->search);
        if($request->has('categories')) $query->category((array) $request->categories);
        if($request->status) $query->status($request->status);
        // personalPost
        if($request->user_id) $query->where('user_id', $request->user_id);
        
        $post = $query->with('category')->paginate(8);
        return PostResource::collection($post);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        // tao slug
        $data['slug'] = Str::slug($data['title']);

        // them thoi gian published
        if ($data['status'] == 'published') $data['published_at'] = now();
        else $data['published_at'] = null;

        // xu ly file anh
        if ($request->file('thumbnail') != null) {
            $file = $request->file('thumbnail');
            $fileName = time() . $data['slug'];
            $path = $file->move(public_path('storage/images'), $fileName);
            $data['thumbnail'] = $fileName;
        }

        $post = Post::create($data);
        return response(new PostResource($post), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
        return new PostResource($post->load('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
        $data = $request->validated();

        // them slug
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        // them thoi gian published
        if ($data['status'] == 'published') $post['published_at'] = now();
        else $post['published_at'] = null;

        // xu ly file anh
        if ($request->file('thumbnail') != null) {
            $file = $request->file('thumbnail');
            $fileName = time() . $data['slug'];
            $path = $file->move(public_path('storage/images'), $fileName);
            $data['thumbnail'] = $fileName;
        }

        $post->update($data);

        return new UserResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
        $post->delete();

        return response()->json(['message' => 'Đã xóa bài viết']);
    }
}
