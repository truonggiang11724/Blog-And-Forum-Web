import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPersonalPosts, fetchPosts } from '../postsSlice'
import styles from './postList.module.css'
import clsx from 'clsx'
import { Link } from 'react-router-dom';

const PostList = (props) => {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const { list, personalList, loading } = useSelector((state) => state.posts);
    let postList = [];
    if (props.personal == true) postList = personalList;
    else postList = list;

    useEffect(() => {
        if (props.personal == true) dispatch(fetchPersonalPosts({ user_id: user.id }));
        else dispatch(fetchPosts());
    }, [])

    const handleDelete = (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa bài viết này không ?')) return;
        dispatch(deletePost(id))
    }
    console.log(list);

    const [page, setPage] = useState(1);
    const handleLoadmore = () => {
        if (props.personal == true) dispatch(fetchPersonalPosts({ user_id: user.id, page: page+1 }));
        else dispatch(fetchPosts({ page: page+1 }));
        setPage(page + 1)
    }

    return (
        <>
            <div className={styles.blogs}>
                {(postList.data && !loading) ? postList.data.map(p => (
                    <div key={p.id} className={styles.blogCard}>
                        <div className={styles.blogCardImageBlock}>
                            <img className={styles.blogCardImage} src={`${import.meta.env.VITE_API_BASE_URL}/storage/images/${p.thumbnail}`} alt='post image' />
                        </div>
                        <div>
                            <small className={styles.blogCardInfo}>{p.author} | {p.published_at}</small>
                            <h4 className={styles.blogCardHeading}>{p.title}</h4>
                            <p className={styles.blogCardContent}>
                                {p.content && p.content.length > 160 ? p.content.substring(0, 160) + '...' : p.content}
                            </p>
                            <Link className={styles.postLink} to={`/detailPost/${p.id}`}>Xem bài viết</Link>
                        </div>
                        {props.personal == true &&
                            <div onClick={() => setMenu(menu === p.id ? null : p.id)} className={styles.optionButton}>
                                ...
                                {p.id === menu &&
                                    <div className={styles.optionGroup}>
                                        <Link className={styles.option} to={`/posts/${p.id}`}>Sửa bài viết</Link>
                                        <a href='#' className={styles.option} onClick={() => handleDelete(p.id)}>Xóa bài viết</a>
                                    </div>
                                }


                            </div>
                        }
                    </div>

                ))
                    : <p>Loading...</p>
                }
                {
                    list.meta && list.meta.last_page !== page &&
                    <button href="#" onClick={handleLoadmore} className={styles.seeMore}>Tải thêm bài viết</button>
                }
            </div>

        </>
    );
}

export default PostList;
