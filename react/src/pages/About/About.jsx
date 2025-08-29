import React from 'react';
import styles from './about.module.css'

const About = () => {
    return (
        <>
            <header className={styles.aboutHeader}>Giới thiệu</header>

            <div className={styles.container}>
                <h2 className={styles.aboutHeading}>Về dự án</h2>
                <p className={styles.paragraph}>
                    Đây là một dự án <b>Blog & Diễn đàn</b> được xây dựng nhằm rèn luyện kỹ năng lập trình
                    web với <b>Laravel (Backend)</b> và <b>ReactJS (Frontend)</b>.
                    Trang web cho phép người dùng chia sẻ bài viết, bình luận, thảo luận
                    và học hỏi lẫn nhau trong một môi trường mở.
                </p>

                <h2 className={styles.aboutHeading}>Mục đích dự án</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Rèn luyện kỹ năng lập trình Fullstack (Laravel + ReactJS).</li>
                    <li className={styles.listItem}>Nâng cao khả năng quản lý cơ sở dữ liệu và API.</li>
                    <li className={styles.listItem}>Làm quen với quy trình phát triển phần mềm thực tế.</li>
                    <li className={styles.listItem}>Tìm kiếm cơ hội thực tập hoặc việc làm thông qua dự án thực tế.</li>
                </ul>

                <h2 className={styles.aboutHeading}>Ý nghĩa</h2>
                <p className={styles.paragraph}>
                    Dự án không chỉ giúp người học luyện tập kỹ năng code, mà còn đóng vai trò
                    như một sản phẩm demo có thể giới thiệu với nhà tuyển dụng,
                    chứng minh khả năng phát triển ứng dụng web hiện đại.
                </p>
            </div>
        </>
    );
}

export default About;
