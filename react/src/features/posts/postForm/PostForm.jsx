import React, { useEffect, useState } from 'react';
import styles from './postForm.module.css';
import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPost, updatePost } from '../postsSlice';
import { getCategories } from '../../../../redux/categorySlice';

const PostForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postInfo, error } = useSelector((state) => state.posts);
    const { listCategory } = useSelector((state) => state.categories)
    const user = localStorage.getItem('user');
    const [form, setForm] = useState({
        category_id: 1,
        title: '',
        content: '',
        thumbnail: null,
        status: '',
    })
    
    const [imageUrl, setImageUrl] = useState(null);    

    useEffect(() => {
        if (postInfo.data && id) {
            setForm({
                ...form,
                category_id: postInfo.data.category_id,
                title: postInfo.data.title,
                content: postInfo.data.content,
                status: postInfo.data.status,
            });
            setImageUrl(`${import.meta.env.VITE_API_BASE_URL}/storage/images/${postInfo.data.thumbnail}`);
        }

    }, [postInfo])
console.log(form);
    
    useEffect(() => {
        if (id) {
            dispatch(getPost(id));
        }
    }, [id]);

    useEffect(() => {
        // Lay danh sach the loai
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (form.thumbnail instanceof File) {
            const url = URL.createObjectURL(form.thumbnail);
            setImageUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [form.thumbnail])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) dispatch(updatePost({ id, form }));
        else dispatch(createPost(form));
        navigate('/posts');
    }

    const handlePreview = (e) => {
        setForm({ ...form, thumbnail: e.target.files?.[0] });
    }

    return (
        <div className={styles.container}>
            {id ? <h2 className={styles.heading}>Sửa bài viết số {id}</h2> :
                <h2 className={styles.heading}>Thêm bài viết mới</h2>
            }

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="category">Thể loại</label>
                    <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} 
                    className={styles.inputText} id="category" name="category" required>
                        {listCategory.data && listCategory.data.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="title">Tiêu đề</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                        className={styles.inputText} type="text" id="title" name="title" placeholder="Enter post title" required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="content">Nội dung</label>
                    <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                        className={clsx(styles.inputText, styles.inputTextArea)}
                        id="content" name="content" placeholder="Write your post here..." required></textarea>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="image">Tải ảnh lên</label>
                    <input className={styles.inputText} onChange={e => handlePreview(e)} type="file" id="image" name="image" />
                    <div className={styles.previewImageBlock}>
                        {/* Xu ly hien thi image */}
                        Xem trước ảnh
                        {(postInfo.data || form.thumbnail) &&
                            <img className={styles.previewImage}
                                src={imageUrl} />
                        }
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Trạng thái</label>
                    <div className={styles.statusOptions}>
                        <label className={styles.statusLabel}><input type="radio" name="status" value="draft"
                            onChange={e => setForm({ ...form, status: e.target.value })}
                            checked={form.status === 'draft'} required />Bản nháp</label>
                        <label className={styles.statusLabel}><input type="radio" name="status" value="published"
                            onChange={e => setForm({ ...form, status: e.target.value })}
                            checked={form.status === 'published'} required />Công khai</label>
                    </div>
                </div>

                <button className={styles.button} type="submit">Đăng bài viết</button>
            </form>
        </div>
    );
}

export default PostForm;
