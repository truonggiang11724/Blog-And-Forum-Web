import React from 'react';
import Sidebar from '../posts/sidebar/Sidebar';
import PostList from '../posts/postList/PostList';
import { Link } from 'react-router-dom';
import styles from './personalPost.module.css'

const PersonalPost = () => {
    return (
        <>
            <div className={styles.container}>
                {/* Filter Sidebar */}
                <Sidebar />
                {/* Post List */}
                <PostList personal={true} />
            </div>
            {/* Create post button */}
            <Link className={styles.createPostButton} to="/posts/new">Thêm bài viết</Link>
        </>
    );
}

export default PersonalPost;
