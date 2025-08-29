import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DefaultHeader from "./header/DefaultHeader";
import { logoutUser } from "../../../../redux/authSlice";
import DefaultFooter from "./footer/DefaultFooter";

function DefaultLayout() {

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    if (!token) return <Navigate to="/login" />

    const handleLogout = () => {
        dispatch(logoutUser());
    }
    return (
        <>
            <DefaultHeader />
            <Outlet />
            <DefaultFooter />
        </>
    );
}

export default DefaultLayout;