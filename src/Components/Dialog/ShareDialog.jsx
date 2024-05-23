import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import Avater from "../Card/Avater";
import { api } from "../axios/api";
import { toast } from 'react-hot-toast';
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function ShareDialog({ open, setOpen, selected }) {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleOpen = () => setOpen(!open);
    const [email, setEmail] = useState("")
    const { user } = useSelector((state) => state.user)
    const [sharedWith, setSharedWith] = useState([])
    const [reload, setReload] = useState(0)
    const [link, setLink] = useState(null)
    useEffect(() => {
        if (selected.length === 1) {
            api.get(`/file/${selected[0]?._id}`)
                .then((res) => {
                    setSharedWith(res?.data?.share || [])
                })
        }
    }, [selected, reload])
    const createShareLink = async () => {
        try {
            const { data } = await api.post(`/share`, {
                files: selected.map((item) => item?._id),
                user: user?._id,
                type: "shared"
            })
            setLink(data?.result)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }

    const share = async () => {
        if (!email) {
            return
        }
        try {
            await api.put(`/file/share/${selected[0]?._id}`, { email })
            toast.success("File shared successfully")
            setSuccess("File shared successfully")
            setReload(reload + 1)
            setEmail("")
            setError("")
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
            setError(error?.response?.data?.message || error.message || "Something went wrong")
            setSuccess("")
        }
    }
    const copyLink = (li) => {
        navigator.clipboard.writeText(li)
        toast.success("Link copied successfully")
        setSuccess("Link copied successfully")
    }
    return (
        <>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogBody className="text-gray-800 max-h-screen overflow-y-auto">
                    <h1>
                        Share  {selected?.length === 1 ? selected[0]?.originalname : `(${selected?.length}) ${"Files"}`}
                    </h1>
                    {
                        success &&
                        <p className="text-sm mt-3 text-green-500">
                            {success}
                        </p>
                    }
                    {
                        error &&
                        <p className="text-sm mt-3 text-red-500">
                            {error}
                        </p>
                    }
                    {
                        selected?.length === 1 &&
                        <>
                            <p className="text-sm mt-3">
                                Add Email
                            </p>
                            <div className="mt-3">

                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                />
                                <button className="btn btn-sm btn-primary mt-3"
                                    onClick={share}
                                >
                                    <span className="text-sm">Share</span>
                                </button>
                            </div>
                        </>
                    }
                    <h1 className="font-semibold mt-5 text-sm">
                        Who has access
                    </h1>
                    <div className="flex gap-3 items-center justify-between mt-3">
                        <div className="flex gap-5">
                            <Avater height={"h-10"} width={"w-10"} />
                            <div className="flex items-start flex-col">
                                <h3 className="text-sm">{selected[0]?.user?.name}</h3>
                                <h4 className="text-sm">
                                    {selected[0]?.user?.email}
                                </h4>
                            </div>
                        </div>

                        <p className="text-xs">Owner</p>
                    </div>
                    <h2 className="mt-2 pl-2">
                        Shared
                    </h2>
                    {
                        sharedWith.map((user, index) => (
                            <div key={index} className="flex gap-3 items-center justify-between mt-3">
                                <div className="flex gap-5">
                                    <Avater height={"h-9"} width={"w-9"} />
                                    <div className="flex items-start flex-col">
                                        <h3 className="text-sm">{user?.name}</h3>
                                        <h4 className="text-sm">
                                            {user?.email}
                                        </h4>
                                    </div>
                                </div>

                                <p className="text-xs">Shared</p>
                            </div>
                        ))
                    }
                    <div className="divider"></div>
                    <h1 className="font-semibold">Share Link</h1>
                    <button
                        onClick={createShareLink}
                        className="btn btn-sm btn-primary mt-1">
                        Create Share Link
                    </button>
                    <div className="flex">
                        <input
                            disabled={!link}
                            className="input input-bordered input-sm w-full mt-3"
                            placeholder={`http://localhost:5173/shared/${link?._id || "663324681a23813be7bab14a"}`} />
                        <button
                            onClick={() => copyLink(`http://localhost:5173/shared/${link?._id}`)}
                            disabled={!link}
                            className="btn btn-sm btn-primary mt-3">
                            Copy
                        </button>
                    </div>
                </DialogBody>
                {/* <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter> */}
            </Dialog>
        </>
    );
}