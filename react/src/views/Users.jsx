import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import Pagination from '../components/Pagination';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getUsers('/users');
    }, [])

    const onDelete = (user) => {
        if (!window.confirm("Are you sure, You want to delete this user?")) {
            return
        }
        axiosClient.delete(`users/${user.id}`)
            .then(() => {
                setNotification("User was successfully deleted!")
                getUsers('/users');
            })
    }

    const getUsers = (link) => {
        if (link == null) return;

        setLoading(true)

        axiosClient.get(link)
            .then(({data}) => {
                console.log(data);
                setLoading(false)
                setUsers(data.data)
                setMeta(data.meta)
                setLinks(data.links)
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to="/users/create" className='btn-add'>Add New</Link>
            </div>
            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan='5' className='text-center'>Loading...</td>
                        </tr>
                    </tbody>}

                    {!loading && <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td>
                                    <Link to={'/users/'+user.id} className='btn-edit'>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(user)} className='btn-delete'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>}
                </table>
                
                
                <Pagination 
                    meta={meta}
                    links={links}
                    getData={getUsers}
                    endUrl="/users"
                />
            </div>
        </div>
    );
}

export default Users;
