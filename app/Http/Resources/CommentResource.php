<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'post_id' => $this->post_id,
            'parent_id' => $this->parent_id,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name,
            'content' => $this->content,
            'like_count' => $this->like_count,
            'created_at' => $this->created_at,
        ];
    }
}
