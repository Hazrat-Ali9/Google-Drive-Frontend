

import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../Pages/Auth/Login';
import Loader from '../Components/Loader';
import Cookie from 'js-cookie';
import Verify from '../Pages/Auth/Verify';

const AuthChecker = ({ children }) => {
    const { user } = useSelector(state => state.user)
    
    const token = Cookie.get('authToken')
    if (user === null) {
        return <Loader />
    }
    else if (user?.isVerified === false) {
        return <Verify />
    }
    else if (user) {
        return children
    }
    else if (!token) {
        return <Login />
    }
};

export default AuthChecker;