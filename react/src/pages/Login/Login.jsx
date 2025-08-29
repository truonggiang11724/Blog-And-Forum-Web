import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../../../redux/authSlice";
import styles from './login.module.css'
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {loading, error} = useSelector((state) => state.auth)
    
    const dispatch = useDispatch();
    
    const handleLogin = (e) => {
        e.preventDefault();        
        dispatch(loginUser({email,password}))
    }

    return (
            <div className={styles.authCard}>
                <h2 className={styles.authHeading}>Đăng nhập</h2>
                {error && <p style={{color: 'red'}}>{error.message}</p>}
                <form onSubmit={handleLogin}>
                    <input className={styles.authInput} onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
                    <input className={styles.authInput} onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    <button className={styles.authButton} type="submit" disabled={loading}>
                        {loading ? 'Đang xử lý' : 'Đăng nhập'}
                    </button>
                    <p className={styles.authText}>Bạn chưa có tài khoản?<Link className={styles.authLink} to="/signup"> Đăng kí ngay</Link></p>
                </form>
            </div>
    );
}

export default Login;