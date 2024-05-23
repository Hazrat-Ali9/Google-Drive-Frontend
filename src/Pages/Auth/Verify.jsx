import { useNavigate } from 'react-router-dom';

import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

import { useState } from "react";
import Cookie from 'js-cookie';
import { api } from '../../Components/axios/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/Slice/userSlice';
import { message } from 'antd';
import { setReloadUser } from '../../redux/Slice/reloadSlice';
import { useSelector } from 'react-redux';
export default function Verify() {
    const { user } = useSelector(state => state.user)
    const token = Cookie.get('authToken')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [code, setCode] = useState('')
    const formHandler = async (e) => {
        if (!code) {
            return message.error('Please enter code')
        }
        try {
            const res = await api.post('/user/verify', { code })
            message.success(res.data.message)
            dispatch(setReloadUser(res.data))
        } catch (error) {
            message.error(error?.response?.data?.message || error.message || "Something went wrong")
        }

    }
    const resendCode = async () => {
        try {
            const res = await api.post('/user/send-email')
            message.success(res.data.message)
            dispatch(setReloadUser(res.data))
        } catch (error) {
            message.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    useEffect(() => {
        if (token) navigate('/drive')
    }, [token])
    return (
        <section className="w-screen flex justify-center pt-20">
            <Card color="transparent" shadow={true} className="p-5 w-[500px]">
                <Typography variant="h4" color="blue-gray">
                    Verify Your Email
                </Typography>
                {
                    user?.isMailSent ?
                        <div className="mt-8 mb-2 w-full">
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Enter Code
                                </Typography>
                                <Input
                                    required
                                    size="lg"
                                    placeholder="Enter 6 digit code"
                                    label='Enter 6 digit code'
                                    onChange={(e) => setCode(e.target.value)}
                                    value={code}
                                // labelProps={{
                                //     className: "before:content-none after:content-none",
                                // }}
                                />
                            </div>
                            <div className='mt-2 btn btn-link'
                                onClick={resendCode}
                            >
                                Don't receive the code?
                            </div>
                            <Button onClick={formHandler} type="submit" className="mt-3" fullWidth>
                                Verify Account
                            </Button>

                        </div>
                        :
                        <>
                            <div className='mt-2 btn btn-primary'
                                onClick={()=> {
                                    resendCode()
                                }}
                            >
                               Send Verification Mail
                            </div>
                        </>
                }
            </Card>
        </section>
    );
}