import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const GuestLayout = () => {
    const {token, user, notification} = useStateContext();

    if (token && user.verified_at) {
        return <Navigate to="/dashboard" />
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
