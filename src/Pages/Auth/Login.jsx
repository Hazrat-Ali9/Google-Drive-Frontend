import { useNavigate } from 'react-router-dom';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Social from "./Social";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Cookie from 'js-cookie';
import { api } from '../../Components/axios/api';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/Slice/userSlice';
import { message } from 'antd';
export default function Login() {
    const token = Cookie.get('authToken')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const formHandler = async (e) => {
        e.preventDefault();
        const target = new FormData(e.target);
        const data = Object.fromEntries(target.entries())
        try {
            const res = await api.post('/user/login', { ...data, provider: "password" })
            Cookie.set('authToken', res.data.token)
            dispatch(setUser(res.data.user))
            message.success('Login Successfully')
            window.location.href = '/drive'
        } catch (error) {
            message.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (token) navigate('/drive')
    }, [token])
    return (
        <section className="w-screen flex justify-center pt-20">
            <Card color="transparent" shadow={true} className="p-5 w-[500px]">
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Welcome back! Please login to your account.
                </Typography>
                <form onSubmit={formHandler} className="mt-8 mb-2 w-full">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            required
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            required
                            type="password"
                            name="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            icon={<FontAwesomeIcon onClick={() => setShow(!show)} icon={faEye} width={16} />}
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button type="submit" className="mt-6" fullWidth>
                        Login
                    </Button>

                </form>
                <div className="flex items-center gap-3">
                    <div className="w-full h-[1px] bg-gray-300" />
                    <span>or</span>
                    <div className="w-full h-[1px] bg-gray-300" />
                </div>
                <Social />
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Don't have an account? {" "}
                    <Link to={`/signup`} className="font-medium text-gray-900">
                        Signup
                    </Link>
                </Typography>
            </Card>
        </section>
    );
}