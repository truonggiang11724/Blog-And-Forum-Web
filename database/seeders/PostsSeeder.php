<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $samples = [
            [
                'user_id' => 51,
                'category_id' => 3,
                'title' => 'Hướng dẫn tối ưu hóa bài viết cho SEO',
                'slug' => 'huong-dan-toi-uu-hoa-bai-viet-cho-seo',
                'content' => 'Trong bài viết này, chúng ta sẽ tìm hiểu cách tối ưu hóa nội dung để tăng lượt tìm kiếm...',
                'thumbnail' => 'seo.jpg',
                'status' => 'published',
                'published_at' => '2025-08-01 10:00:00',
            ],
            [
                'user_id' => 52,
                'category_id' => 2,
                'title' => 'Bản cập nhật mới cho ứng dụng XYZ',
                'slug' => 'ban-cap-nhat-moi-cho-ung-dung-xyz',
                'content' => 'Phiên bản mới mang lại cải tiến hiệu suất và sửa lỗi phổ biến...',
                'thumbnail' => 'capnhat.jpg',
                'status' => 'published',
                'published_at' => '2025-08-05 14:30:00',
            ],
            [
                'user_id' => 51,
                'category_id' => 1,
                'title' => 'Case study: tăng lượt đọc từ 5k lên 50k',
                'slug' => 'case-study-tang-luot-doc-5k-50k',
                'content' => 'Phân tích các yếu tố thành công trong chiến lược nội dung...',
                'thumbnail' => 'tangluotdoc.jpg',
                'status' => 'draft',
                'published_at' => null,
            ],
            [
                'user_id' => 53,
                'category_id' => 1,
                'title' => 'Khám phá công cụ AI cho nhà phát triển',
                'slug' => 'kham-pha-cong-cu-ai-cho-nha-phat-trien',
                'content' => 'Trong bài viết này sẽ giới thiệu các công cụ AI hữu ích cho workflow...',
                'thumbnail' => 'congcuai.jpg',
                'status' => 'published',
                'published_at' => '2025-08-12 09:15:00',
            ],
            [
                'user_id' => 52,
                'category_id' => 2,
                'title' => 'Tips viết tiêu đề gây ấn tượng',
                'slug' => 'tips-viet-tieu-de-gay-an-tuong',
                'content' => 'Tiêu đề là yếu tố quyết định. Dưới đây là một số công thức...',
                'thumbnail' => 'tieude.jpg',
                'status' => 'published',
                'published_at' => '2025-08-14 08:00:00',
            ],
        ];

        //
        foreach ($samples as $data) {
            $baseSlug = $data['slug'];
            $slug = $baseSlug;
            $i = 1;
            while (Post::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $i;
                $i++;
            }

            Post::create([
                'user_id' => $data['user_id'],
                'category_id' => $data['category_id'],
                'title' => $data['title'],
                'slug' => $slug,
                'content' => $data['content'],
                'thumbnail' => $data['thumbnail'],
                'status' => $data['status'],
                'published_at' => $data['published_at'],
            ]);
        }
    }
}
