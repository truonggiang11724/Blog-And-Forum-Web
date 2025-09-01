# 🚀 Blog & Forum Website - Laravel RESTful API + ReactJS

Một dự án **Blog Website** được xây dựng với **Laravel (API backend)** và **ReactJS (frontend)**.  
Mục đích chính: rèn luyện kỹ năng lập trình Front-end & Back-end, tối ưu hiệu năng, nâng cao kiến thức lập trình.

---

## 🌟 Tính năng nổi bật

### 👤 Quản lý người dùng (Users)
- Đăng ký, đăng nhập, đăng xuất (JWT/Auth Sanctum).
- Phân quyền: **User** & **Admin**.
- CRUD tài khoản người dùng.
- Phân trang danh sách user.

### 📝 Quản lý bài viết (Posts)
- CRUD bài viết (create, read, update, delete).
- Gắn tác giả, slug, thumbnail, trạng thái (draft/published).
- API Resource chuẩn RESTful.
- Upload ảnh bài viết.
- Phân trang + tìm kiếm + lọc bài viết.

### 💬 Bình luận (Comments)
- Người dùng đăng bình luận.
- CRUD bình luận.
- Quản lý bình luận từ admin.

### 🏷️ Danh mục & Tag
- Tạo & quản lý danh mục.
- Gắn tag vào bài viết.
- Lọc bài viết theo danh mục/tag.

### 🔎 Tìm kiếm & Lọc
- Tìm kiếm bài viết theo tiêu đề/nội dung.
- Lọc theo trạng thái, danh mục, tag.

### 📊 Admin Dashboard
- Thống kê số lượng bài viết, người dùng, bình luận.
- Quản lý tất cả dữ liệu trong hệ thống.

---

## ⚙️ Công nghệ sử dụng

### Backend (Laravel)
- [Laravel 11](https://laravel.com) - RESTful API.
- Laravel Sanctum - Authentication.
- Eloquent ORM - Quản lý CSDL.
- API Resource - Format dữ liệu trả về.
- MySQL - Database.

### Frontend (ReactJS)
- [React 18](https://react.dev).
- React Router - Routing SPA.
- Redux Toolkit - Quản lý state.
- Axios - Gọi API.
- TailwindCSS - Giao diện.

---

## 📂 Cấu trúc thư mục

### Backend (Laravel)

app/
├── Http/
│ ├── Controllers/Api/ # Controllers cho API
│ ├── Resources/ # API Resources
│
├── Models/ # Eloquent Models
routes/
├── api.php # Định nghĩa API routes
database/
├── migrations/ # Các file migration


### Frontend (ReactJS)
src/
├── api/ # Hàm gọi API bằng Axios
├── components/ # Các component tái sử dụng ( Header, Footer,...)
├── features/ # Các trang chức năng bao gồm cả Redux slices
├── pages/ # Các trang (Home, Blog, Login,...)
├── store/ # Redux store
├── App.js # App chính


---

## 🚀 Cài đặt & chạy dự án

### 1️⃣ Backend - Laravel API
```bash

cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

API chạy tại: http://127.0.0.1:8000/api

### 2️⃣ Frontend - ReactJS
```bash
cd react
npm install
npm start


🔑 Demo API

GET /api/posts → Danh sách bài viết.

POST /api/posts → Tạo bài viết (yêu cầu login).

PUT /api/posts/{id} → Cập nhật bài viết.

DELETE /api/posts/{id} → Xóa bài viết.

👨‍💻 Tác giả

Tên: Nguyễn Trường Giang

Email: [truonggiang11724@gmail.com]

GitHub: https://github.com/truonggiang11724
