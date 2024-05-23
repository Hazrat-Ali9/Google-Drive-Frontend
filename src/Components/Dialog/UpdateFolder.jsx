import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Button } from 'antd';
import { useSelector } from "react-redux";
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import { setReloaFolder } from "../../redux/Slice/reloadSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import toast from "react-hot-toast";
import { api } from "../axios/api";

export function UpdateFolder({ open, setOpen, folder }) {
    const { user } = useSelector((state) => state.user)
    const handleOpen = () => setOpen(!open);
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const createFolder = async () => {
        if (!name) {
            setError("Folder name is required")
            return
        }
        try {
            const config = {
                name: name
            }
            const res = await api.put(`/folder/${folder?._id}`, config)
            setOpen(false)
            dispatch(setReloaFolder(res.data))
            message.success("Folder updated successfully")
            setError("")
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
            setError(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    useEffect(() => {
        if (folder) {
            setName(folder?.name)
        }
    },[folder])

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Update folder</DialogHeader>
                <DialogBody >
                    <p className="text-red-500 text-sm mb-5">
                        {error}
                    </p>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="md" label="Folder Name" />
                    <button
                        onClick={createFolder}
                        className="btn btn-primary btn-sm mt-5">
                        Update
                    </button>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}