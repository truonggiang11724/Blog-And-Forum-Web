import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../redux/authSlice";
import styles from './signup.module.css';
import { Link } from "react-router-dom";

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const { loading, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(signupUser({name, email, password, password_confirmation}));
    }

    return (
        <div className={styles.authCard}>
            <h2 className={styles.authHeading}>Đăng kí</h2>
            {error && error.errors && error.errors.password && error.errors.password.map((message, index) => (
                <p key={index} style={{color: 'red'}}>{message}</p>
                )) }
                <form onSubmit={handleSignup}>
                    <input className={styles.authInput} value={name} onChange={e => setName(e.target.value)} placeholder="Fullname" />
                    <input className={styles.authInput} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    <input className={styles.authInput} placeholder="Password" type="password"
                    value={password} onChange={e => setPassword(e.target.value)} />
                    <input className={styles.authInput} placeholder="Confirm password" type="password"
                     value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
                    <button className={styles.authButton} type="submit" disabled={loading}>{loading ? 'Đang xử lý' : 'Đăng kí'}</button>
                </form>
                <p className={styles.authText}>Bạn đã có tài khoản?<Link className={styles.authLink} to="/login"> Đăng nhập</Link></p>
        </div>
    );
}

export default Signup;