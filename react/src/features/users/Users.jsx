import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "./usersSlice";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import styles from './users.module.css'

function Users() {

    const { list, loading, notification } = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [notiMesssage, setNotiMessage] = useState(null);    

    useEffect(() => {
        if (notification) {
            setNotiMessage(notification);
            setTimeout(() => {
                setNotiMessage(null);
            }, 5000);
        }
    }, [notification]);

    const dispatch = useDispatch();
    console.log(list);
    

    useEffect(() => {
        dispatch(fetchUsers(currentPage));
    }, [currentPage]);

    const handlePaginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDeleteUser = (userId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này không'+userId)) return;
        dispatch(deleteUser(userId));
    }

    return (
        <>
            <h2>Users</h2>
            {notiMesssage && <div className={styles.notification}>{notiMesssage}</div>}
            <Link to="/users/new">Thêm người dùng</Link>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created_at</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>

                    </thead>


                    <tbody>
                        {loading ? <tr><td colSpan={5}>Loading...</td></tr> :
                            (list.data && parseInt(list.data['length']) > 0 && list.data.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td><Link to={'/users/' + user.id}>Edit</Link></td>
                                    <td><button onClick={() => handleDeleteUser(user.id)}>Delete</button></td>
                                </tr>
                            )))}
                    </tbody>



                </table>
                <div>
                    {/* Paginate */}
                    {list.meta && list.meta.links.map((link, index) => {
                        if (index === 0)
                            return <button
                                key={index}
                                value={parseInt(currentPage) - 1}
                                onClick={e => handlePaginate(e.target.value)}
                                disabled={currentPage == 1}>
                                Previous</button>
                        else if (index === list.meta.links.length - 1)
                            return <button
                                key={index}
                                value={parseInt(currentPage) + 1}
                                onClick={e => handlePaginate(e.target.value)}
                                disabled={currentPage == list.meta.links.length - 2}>
                                Next</button>
                        else return (
                            <button key={index} value={index} onClick={e => handlePaginate(e.target.value)}>{index}</button>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Users;