import React from 'react';
import styles from './defaultFooter.module.css';

const DefaultFooter = () => {
    return (
        <>
            <footer className={styles.footer}>
                <p className={styles.footerText}>Đây là trang web blog & forum, nơi chia sẻ kiến thức bổ ích liên quan đến các vấn đề đời sống, công việc, sức khỏe.</p>
                <p className={styles.footerText}>Sản phẩm là dự án được thực hiện nhằm rèn luyện kỹ năng lập trình chức năng Front-end (ReactJS) & Back-end (Laravel).</p>
                <div className={styles.footerLink}>
                    <a href="#">Giới thiệu</a>
                    <a href="#">Bài viết</a>
                    <a href="#">Cộng đồng</a>
                    <a href="#">Điều khoản sử dụng</a>
                    <a href="#">Chính sách bảo mật</a>
                    <a href="#">Thông báo</a>
                </div>
                <div className={styles.footerIcon}>
                    <a className={styles.footerIconLink} href="#">Fb</a>
                    <a className={styles.footerIconLink} href="#">Tw</a>
                    <a className={styles.footerIconLink} href="#">In</a>
                </div>
                <p className={styles.copyright}>2025 © truonggiang11724 | All Rights Reserved</p>
            </footer>
        </>
    );
}

export default DefaultFooter;
