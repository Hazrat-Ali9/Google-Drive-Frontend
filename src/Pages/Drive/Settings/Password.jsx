
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { message } from 'antd';
import { Input } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../Components/axios/api';
import Google from './Google';

const Password = () => {
    const [pass, setPassword] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
    const { user } = useSelector((state) => state.user)
    const handlerChange = async () => {
        try {
            if (pass?.newPassword !== pass?.confirmPassword) {
                return message.error('Password does not match')
            }
            if (pass?.oldPassword === pass?.newPassword) {
                return message.error('New password can not be same as old password')
            }
            if (pass?.newPassword.length < 6) {
                return message.error('Password must be at least 6 characters')
            }
            const res = await api.put(`/user/password/${user?._id}`, pass)
            message.success('Password Changed Successfully')
        } catch (error) {
            message.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    if (user?.provider === "google") {
        return <Google />
    }
    return (
        <div className='max-w-[500px]'>
            <h1 className='text-2xl'>Change your Password</h1>
            <div className='mt-10'>
                <div>
                    <Typography.Title level={5}>Old Password</Typography.Title>
                    <Input.Password
                        placeholder="Old Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        variant="outlined"
                        onChange={(e) => setPassword({ ...pass, oldPassword: e.target.value })}
                        value={pass?.oldPassword}
                    />
                </div>
                <div className='mt-4'>
                    <Typography.Title level={5}>New Password</Typography.Title>
                    <Input.Password
                        placeholder="New Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        variant="outlined"
                        onChange={(e) => setPassword({ ...pass, newPassword: e.target.value })}
                        value={pass?.newPassword}
                        className={`${pass?.newPassword !== pass?.confirmPassword ? '' : 'border-green-500'}`}
                    />
                </div>
                <div className='mt-4'>
                    <Typography.Title level={5}>Confirm Password</Typography.Title>
                    <Input.Password
                        placeholder="New Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        variant="outlined"
                        onChange={(e) => setPassword({ ...pass, confirmPassword: e.target.value })}
                        value={pass?.confirmPassword}
                        className={`${pass?.newPassword !== pass?.confirmPassword ? 'border-red-500' : 'border-green-500'}`}
                    />
                </div>
                <button onClick={handlerChange} className='btn btn-primary mt-5'>
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default Password;
// Password