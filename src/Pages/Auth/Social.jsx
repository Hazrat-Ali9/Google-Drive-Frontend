import { useNavigate } from 'react-router-dom';
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { api } from '../../Components/axios/api';
import Cookie from 'js-cookie';
import { toast } from 'react-hot-toast';
import { decodeToken } from 'react-jwt';
const Social = () => {
    const clientId = "945344222356-ni54p9vtt5hvijagqfspp94ejc7ev6gd.apps.googleusercontent.com";
    const navigate = useNavigate();
    const onSUccess = async (credentialResponse) => {

        const token = credentialResponse.credential;
        const { email, name, picture } = decodeToken(token)
        try {
            const res = await api.post('/user/login-google', {
                email,
                provider: "google",
                name,
                picture,
                password: "XXXXXX"
            })
            Cookie.set('authToken', res.data.token)
            toast.success('Login Successfully')
            window.location.href = '/drive'
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    };
    return (
        <div className='flex justify-center w-full'>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    size='large'
                    type='standard'
                    onSuccess={onSUccess}
                    onError={(e) => {
                        console.error(e);
                    }}
                />
            </GoogleOAuthProvider>

        </div>
    );
};

export default Social;


