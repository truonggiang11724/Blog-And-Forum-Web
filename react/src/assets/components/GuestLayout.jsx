import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function GuestLayout() {
    const {token} = useSelector((state) => state.auth);
    if (token) return <Navigate to='/posts'/>;
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <Outlet />
        </div>
    );
}

export default GuestLayout;