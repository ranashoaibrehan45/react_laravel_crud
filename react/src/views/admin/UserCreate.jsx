import React, { useEffect, useState, Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';

const UserCreate = () => {
    const navigate = useNavigate()
    const {setNotification} = useStateContext()

    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    
    const [user, setUser] = useState({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        avatar: null,
        password: '',
        password_confirmation: '',
    })

    const onChange = (ev) => {
        console.log(user);
        setUser({...user, avatar: ev.target.files[0]})
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("User was successfully updated!")
                    navigate('/users')
                })
                .catch(error => {
                    const response = error.response;
                    if (response && response.status == 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification("User was successfully created!")
                    navigate('/users')
                })
                .catch(error => {
                    const response = error.response;
                    if (response && response.status == 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }
    
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    return (
        <div>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>Create New User</h1>}

            <div className='card animated fadeInDown'>
                {loading && (
                    <div className='text-center'>Loading...</div>
                )}

                {errors && 
                    <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }

                {!loading && 
                    <form onSubmit={onSubmit}>
                        <input type="text" value={user.first_name} onChange={ev => setUser({...user, first_name: ev.target.value})} placeholder='First Name'/>
                        <input type="text" value={user.last_name} onChange={ev => setUser({...user, last_name: ev.target.value})} placeholder='Last Name'/>
                        <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder='Email'/>
                        <input type="file" value={''} onChange={onChange} placeholder='Upload Image'/>
                        
                        <input type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder='Password'/>
                        <input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder='Password Confirmation'/>
                        <button className='btn'>Save</button>
                    </form>
                }
            </div>
            
        </div>
    );
}

export default UserCreate;
