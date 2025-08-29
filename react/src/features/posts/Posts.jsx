import React from 'react';
import styles from './posts.module.css'
import PostList from './postList/PostList';
import heroImage from '../../assets/images/anhnen.jpg'
import Sidebar from './sidebar/Sidebar';
import { Link } from 'react-router-dom';
import DefaultFooter from '../../assets/components/DefaultLayout/footer/DefaultFooter';

const Posts = () => {
    return (
        <>
            <section className={styles.hero}>
                <h1 className={styles.heroHeading}>Blog & Forum</h1>
                <p className={styles.heroContent}>Blog là một loại nhật ký trực tuyến, 
                là nơi các cá nhân hoặc tổ chức có thể chia sẻ kiến thức, kinh nghiệm, thông tin, quan điểm cá nhân về một hoặc nhiều chủ đề</p>
                <p className={styles.heroContent}>Diễn đàn (forum) là nơi mọi người có thể thảo luận, chia sẻ ý kiến về một vấn đề cụ thể. Nó có thể là một nền tảng trực tuyến hoặc một cuộc họp trực tiếp. Các diễn đàn trực tuyến thường được sử dụng để trao đổi thông tin, đặt câu hỏi, và xây dựng cộng đồng. Diễn đàn có thể được sử dụng trong nhiều bối cảnh khác nhau, từ giáo dục đến chuyên môn, giúp mọi người giao tiếp và học hỏi lẫn nhau.</p>
                <a href="#">Read full blog</a>
                <img className={styles.heroImage} src={heroImage} alt='hero image' />
            </section>
            <div className={styles.container}>
                {/* Filter Sidebar */}
                <Sidebar />
                {/* Post List */}
                <PostList />
            </div>
            {/* Create post button */}
            <Link className={styles.createPostButton} to="/posts/new">Thêm bài viết</Link>
            
        </>
    );
}

export default Posts;
