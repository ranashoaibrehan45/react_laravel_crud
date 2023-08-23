import React, { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

const VerifyEmail = () => {
    const {user, setUser, setNotification} = useStateContext()
    
    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    const resendVerificationEmail = () => {
        axiosClient.post('/email/verification-notification')
        .then((resp) => {
            setNotification(resp.data.message)
        })
        .catch(error => {
            const response = error.response;
            if (response && response.status == 422) {
                setErrors(response.data.errors)
            }
        })
    }

    return (
        <div>
            <p>Verification email has been sent to <strong>{user.email}</strong>. 
            Please go to user inbox and and confirm your email to continue.</p>
            <div className='text-center'>
                <button className='btn' onClick={resendVerificationEmail}>Resend Verification Email</button>
            </div>
        </div>
    );
}

export default VerifyEmail;
