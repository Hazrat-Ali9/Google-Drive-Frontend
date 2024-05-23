import React from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { api } from "../axios/api";
import { message } from "antd";

export default function UpdateDialog({ open, setOpen, user, refetch, mode, setMode }) {

    const handleOpen = () => setOpen((cur) => !cur);
    const [info, setInfo] = useState({
        name: user?.name,
        email: user?.email,
        password: "",
        confirm: "",
    })
    const [error, setError] = useState("")
    const updateProfile = async () => {
        try {
            let res
            if (mode === "info") {
                res = await api.put(`/user/${user?._id}`, {
                    name: info?.name,
                })
            }
            else if (mode === "password") {
                if (!info.password) {
                    return message.error("Password is required")
                }
                res = await api.put(`/user/password-update/${user?._id}`, {
                    password: info?.password
                })
            }
            else if (mode === "delete") {
                if (info.confirm !== "Delete") {
                    return setError("Please type 'Delete' to delete account")
                }
                res = await api.delete(`/user/${user?._id}`)
            }
            toast.success("Profile updated successfully")
            setOpen(false)
            refetch()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        setInfo(user)
    }, [user])
    return (
        <>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    {
                        mode === "info" &&
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Update Account
                            </Typography>
                            {
                                info?.provider === "password" &&
                                <button
                                    onClick={() => setMode("password")}
                                    className="btn btn-link">
                                    Change Password
                                </button>
                            }
                            <Typography className="-mb-2" variant="h6">
                                Your Email
                            </Typography>
                            <Input
                                disabled
                                value={user?.email}
                                label="Email"
                                size="lg"
                            />
                            <Typography className="-mb-2" variant="h6">
                                Name
                            </Typography>
                            <Input
                                value={info?.name}
                                label="Name"
                                size="lg"
                                onChange={(e) => setInfo((cur) => ({ ...cur, name: e.target.value }))}
                            />
                        </CardBody>
                    }
                    {
                        mode === "delete" &&
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="red">
                                Delete Account
                            </Typography>
                            <p className="text-sm text-red-600">
                                Are you sure you want to delete your account?
                                This action cannot be undone. All your data will be permanently deleted.
                            </p>
                            <Typography className="-mb-2" variant="h6">
                                Your Email
                            </Typography>
                            <Input
                                disabled
                                value={user?.email}
                                label="Email"
                                size="lg"
                            />
                            <Typography className="-mb-2" variant="h6">
                                Write (Delete)
                            </Typography>
                            <Input
                                value={info?.confirm}
                                size="lg"
                                label="Write Delete"
                                onChange={(e) => setInfo((cur) => ({ ...cur, confirm: e.target.value }))}
                            />
                        </CardBody>
                    }
                    {
                        mode === "password" &&
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Update Password
                            </Typography>
                            <button
                                onClick={() => setMode("info")}
                                className="btn btn-link">
                                Update Info
                            </button>
                            <Typography className="-mb-2" variant="h6">
                                Your Email
                            </Typography>
                            <Input
                                name="email"
                                disabled
                                value={user?.email}
                                label="Email"
                                size="lg"
                            />
                            <Typography className="-mb-2" variant="h6">
                                Password
                            </Typography>
                            <Input
                                name="password"
                                value={info?.password}
                                label="Password"
                                size="lg"
                                onChange={(e) => setInfo((cur) => ({ ...cur, password: e.target.value }))}
                                type={showPassword ? "text" : "password"}
                                icon={
                                    <FontAwesomeIcon
                                        onClick={() => setShowPassword((cur) => !cur)}
                                        icon={faEye}
                                    />
                                }
                            />
                        </CardBody>
                    }


                    <CardFooter className="pt-0">
                        <p className="text-red-600 text-sm mb-2">
                            {error}
                        </p>
                        <Button variant="gradient" onClick={updateProfile} fullWidth>
                            {
                                mode === "delete" ? "Delete Account" : mode === "info" ? "Update Profile" : "Update Password"
                            }
                        </Button>
                        <button className="btn btn-link mt-3 float-end" onClick={handleOpen}>
                            Close
                        </button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}