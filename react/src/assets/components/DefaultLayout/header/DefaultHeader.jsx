import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../../redux/authSlice';
import { Link } from 'react-router-dom';
import styles from './defaultHeader.module.css'

const DefaultHeader = () => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) return <Navigate to="/login" />

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <header className={styles.header}>
            <div className="logo"><strong>React</strong></div>
            <nav className={styles.headerLinkGroup}>
                <Link className={styles.headerLink} to="/posts">Trang chủ</Link>
                <Link className={styles.headerLink} to="/posts">Bài viết</Link>
                <Link className={styles.headerLink} to="/about">Giới thiệu</Link>
                <Link className={styles.headerLink} to="/posts">Blog</Link>
                <Link className={styles.headerLink} to="/users">Admin (Test)</Link>
                {user && <Link className={styles.headerLink} to="/personalPost">Bài viết của tôi</Link>}
            </nav>
            <div>
                {user && <strong>Xin chào <span className={styles.userName}>{user.name}</span></strong>}
                {/* <a href="#" className={styles.headerButton}>Contact us</a> */}
                {token ? <a href="#" className={styles.logoutButton} onClick={handleLogout}>Đăng xuất</a>
                : <Link className={styles.logoutButton}  to="/login">Đăng nhập</Link>
                }
                
            </div>
        </header>
    );
}

export default DefaultHeader;
