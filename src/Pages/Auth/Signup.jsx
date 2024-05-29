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
import { api } from "../../Components/axios/api";
import Cookie from 'js-cookie';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    const formHandler = async (e) => {
        e.preventDefault();
        const target = new FormData(e.target);
        const data = Object.fromEntries(target.entries())
        try {
            const newUser = {
                ...data, provider: "password"
            }
            const res = await api.post('/user/register', newUser)
            Cookie.set('authToken', res.data.token)
            toast.success('Signup Successfully')
            window.location.href = '/drive'
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const [show, setShow] = useState(false)
    return (
        <section className="w-screen flex justify-center pt-20">
            <Card color="transparent" shadow={true} className="p-5 w-[500px]">
                <Typography variant="h4" color="blue-gray">
                    Signup
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form onSubmit={formHandler} className="mt-8 mb-2 w-full">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Full Name
                        </Typography>
                        <Input
                            required
                            size="lg"
                            type="text"
                            name="name"
                            placeholder="Jhon Doe"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
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
                            type={show ? "text" : "password"}
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
                        sign up
                    </Button>

                </form>
                <div className="flex items-center gap-3">
                    <div className="w-full h-[1px] bg-gray-300" />
                    <span>or</span>
                    <div className="w-full h-[1px] bg-gray-300" />
                </div>
                <Social />
                <Typography color="gray" className="mt-4 text-center font-normal">
                    ALrady have an account? {" "}
                    <Link to={`/login`} className="font-medium text-gray-900">
                        Login
                    </Link>
                </Typography>
            </Card>
        </section>
    );
}

// Sign Up