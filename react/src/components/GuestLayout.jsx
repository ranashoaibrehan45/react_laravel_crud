import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import '../css/index.css'

const GuestLayout = () => {
    const {token, user, notification} = useStateContext();

    if (token) {
        if (Object.keys(user).length > 0 && user.email_verified_at === null) {
            return <Navigate to="/email/verification" />
        } else if (Object.keys(user).length > 0 && user.role === 'admin') {
            return <Navigate to="/admin/dashboard" />
        } else {
            return <Navigate to="/dashboard" />
        }
    }

    return (
        <>
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <Outlet />
            </div>
        </div>
        {notification && 
            <div className='notification'>
                {notification}
            </div>
        }
        </>
    );
}

export default GuestLayout;
