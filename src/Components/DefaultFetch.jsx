
import { useEffect } from 'react';
import Cookie from 'js-cookie';
import { api } from './axios/api';

import { setUser } from '../redux/Slice/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const DefaultFetch = () => {
    const token = Cookie.get('authToken')
    const [number, setNumber] = useState(0)
    const dispatch = useDispatch()
    const { reloadUser } = useSelector((state) => state.reload)
    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const user = await api.get('/user/me')
                    dispatch(setUser(user.data))

                } catch (error) {
                    console.error(error)
                }
            })()
        }
        else {
            dispatch(setUser(undefined))
        }
    }, [token, number, reloadUser])
    // increase number every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setNumber(number + 1)
        }, 60000)
        return () => clearInterval(interval)
    },
        [number])
    return null
};

export default DefaultFetch;