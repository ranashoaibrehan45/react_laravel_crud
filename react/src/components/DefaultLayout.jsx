import React, { useEffect } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import '../css/index.css'

import axiosClient from '../axios-client';

const DefaultLayout = () => {
    const {user, token, notification, setUser, setToken} = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    } else if (Object.keys(user).length > 0 && user.email_verified_at === null) {
        return <Navigate to="verify" />
    } else if (Object.keys(user).length > 0 && user.role === 'admin') {
        return <Navigate to="/admin" />
    }

    const onLogout = (e) => {
        e.preventDefault()
        
        axiosClient.post('logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    return (
        <div id='defaultLayout'>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

            {notification && 
                <div className='notification'>
                    {notification}
                </div>
            }
        </div>
    );
}

export default DefaultLayout;
