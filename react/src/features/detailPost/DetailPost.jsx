import React, { useEffect } from 'react';
import styles from './detailPost.module.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPost } from '../posts/postsSlice';
import Comments from './comments/Comments';

const DetailPost = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { postInfo, list } = useSelector((state) => state.posts);
    // Cắt mảng bài viết
    var listSlice =[];
    if (list.data) listSlice = list.data.slice(0,3);    

    useEffect(() => {
        if (id) dispatch(getPost(id));
        window.scrollTo(0,0);
    }, [])

    useEffect(() => {
        if (!list.data) dispatch(fetchPosts());
    }, [])

    return (
        <div className={styles.container}>
            {postInfo.data &&
                <div className={styles.post}>
                    <h1 className={styles.postHeading}>{postInfo.data.title}</h1>
                    <strong>{postInfo.data.author} | {postInfo.data.published_at}</strong><br></br>
                    <img className={styles.postImage} alt="Ảnh minh họa"
                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/images/${postInfo.data.thumbnail}`} />
                    <p className={styles.postContent}>
                        {postInfo.data.content}
                    </p>
                </div>
            }
            {/* Comments */}
            <div className={styles.comments}>
                <h2 className={styles.commentsHeading}>Bình luận</h2>
                <Comments />

                {list.data &&
                    <div className={styles.postList}>
                        Bài viết liên quan
                        { listSlice &&
                            listSlice.map(p => (
                                <div key={p.id} className={styles.blogCard}>
                                    <div className={styles.blogCardImageBlock}>
                                        <img className={styles.blogCardImage} src={`${import.meta.env.VITE_API_BASE_URL}/storage/images/${p.thumbnail}`} alt='post image' />
                                    </div>
                                    <div>
                                        <small className={styles.blogCardInfo}>{p.author} | {p.published_at}</small>
                                        <h4 className={styles.blogCardHeading}>
                                        {p.title && p.title.length > 36 ? p.title.substring(0, 36) + '...' : p.title}
                                        </h4>
                                        <p className={styles.blogCardContent}>
                                            {p.content && p.content.length > 60 ? p.content.substring(0, 60) + '...' : p.content}
                                        </p>
                                        <a href="#">Read full blog</a>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default DetailPost;
