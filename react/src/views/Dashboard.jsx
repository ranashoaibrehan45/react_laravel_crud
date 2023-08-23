import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

const Dashboard = () => {
    const {user, setUser} = useStateContext()

    useEffect(() => {
        axiosClient.get('user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
