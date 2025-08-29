import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUser, updateUser } from './usersSlice';
import { useState } from 'react';

const UserForm = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const { id } = useParams();
    const dispatch = useDispatch();
    const { userInfo, loading, error, notification } = useSelector((state) => state.users);
    const navigate = useNavigate();


    useEffect(() => {
        if (id)
            dispatch(getUser(id));
    }, []);

    useEffect(() => {
        if (id && userInfo.data) setUser((prev) => ({
            ...prev,
            name: userInfo.data.name ?? '',
            email: userInfo.data.email ?? '',
        }))
    }, [loading])

    useEffect(() => {
        if (notification && user.name!='')
            navigate('/users');
    }, [notification])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (id) dispatch(updateUser({ id, user }));
        else dispatch(createUser(user));
    };

    return (
        <>
            UserForm
            {id ? <h2>Edit User {id}</h2> : <h2>Create new User</h2>}
            {/* alert */}
            {/* error */}
            {error && <div className='error'>
                {Object.keys(error).map(key => (
                    <p style={{color: 'red'}} key={key}>{error[key][0]}</p>
                ))}
            </div>}
            {/* form */}
            {loading ? <p>...loading</p> :
                <form onSubmit={handleSubmitForm}>
                    <input value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder='Full name' required />
                    <input type='email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder='Email' required />
                    <input type='password' onChange={e => setUser({ ...user, password: e.target.value })} placeholder='Password' required={id == undefined} />
                    <input type='password' onChange={e => setUser({ ...user, password_confirmation: e.target.value })} placeholder='Confirm Password' required={id == undefined} />
                    <button type='submit'>{id ? 'Update User' : 'Create User'}</button>
                </form>
            }

        </>
    );
}

export default UserForm;
