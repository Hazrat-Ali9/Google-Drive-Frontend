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
import { FolderAddFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { setReloaFolder } from "../../redux/Slice/reloadSlice";

export function CopyMoveDialog({ open, setOpen, folder, mode }) {
    const handleOpen = () => setOpen(!open);
    const { user } = useSelector(state => state.user)
    const { data: folders, isLoading } = useQuery({
        queryKey: ["folders-all", user?._id,],
        queryFn: async () => {
            const { data } = await api.get(`/folder/user-folder/${user?._id}/${folder?._id}`);
            return data;
        },
    });
    const handler = async () => {
        try {
            if (mode === "copy") {
                if (selected?.parent === "root") {
                    const newFolder = {
                        name: folder?.name,
                        code: folder?.code,
                        user: user?._id
                    }
                    await api.post("/folder/create", newFolder);
                }
                else {
                    const newFolder = {
                        name: folder?.name,
                        code: folder?.code,
                        parent: selected?._id,
                        user: user?._id
                    }
                    await api.post("/folder/create", newFolder);
                }
                setOpen(false)
                toast.success("Folder Copied successfully");

            } else {
                if (selected?.parent === "root") {
                    await api.post("/folder/move", {
                        _id: folder?._id,
                        parent: "root"
                    });
                }
                else {
                    await api.post("/folder/move", {
                        _id: folder?._id,
                        parent: selected?._id
                    });
                }
                setOpen(false)
                toast.success("Folder Moved successfully");
            }
            setReloaFolder(Math.random())
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const [selected, setSelected] = useState({});
    return (
        <>
            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>{mode === "copy" ? "Copy" : "Move"}
                    <span className="ml-2">
                        {folder?.name}
                    </span>
                </DialogHeader>
                <DialogBody
                    className="text-gray-800 "
                >
                    {
                        isLoading && <Loader />
                    }
                    <h1>
                        Select Location to {mode === "copy" ? "Copy" : "Move"}
                    </h1>
                    <div className="mt-1  max-h-[500px] overflow-y-auto">
                        <ul>
                            {
                                folder?.parent && <li
                                    className="mt-2 cursor-pointer"
                                    onClick={() => setSelected({ parent: "root", _id: "" })}
                                >
                                    <div className={`flex items-center gap-4 hover:bg-blue-gray-50 ${selected?.parent === "root" ? "bg-primary hover:bg-primary text-white" : ""} py-1 px-2`}>
                                        <span className="text-lg">
                                            <FontAwesomeIcon icon={faFolderOpen} />
                                        </span>
                                        <h2 className="text-sm">
                                            Root
                                        </h2>
                                    </div>
                                </li>
                            }
                            {
                                folders?.data?.length > 0 ?
                                    (folders?.data?.filter((item) => item?._id !== folder?.parent))?.map((item) => (
                                        <li key={item._id}
                                            className="mt-2 cursor-pointer"
                                            onClick={() => setSelected(item)}
                                        >
                                            <div className={`flex items-center gap-4 hover:bg-blue-gray-50 ${selected?._id === item?._id ? "bg-primary hover:bg-primary text-white" : ""} py-1 px-2`}>
                                                <span className="text-lg">
                                                    <FontAwesomeIcon icon={faFolder} />
                                                </span>
                                                <h2 className="text-sm">
                                                    {
                                                        item?.parent ? <>
                                                            {
                                                                item.name
                                                            }
                                                            <span className="text-xs px-2">
                                                                <FontAwesomeIcon
                                                                    icon={faChevronRight}
                                                                />
                                                            </span>
                                                            {
                                                                item?.parent?.name
                                                            }
                                                        </>
                                                            :
                                                            item.name
                                                    }
                                                </h2>
                                            </div>
                                        </li>
                                    ))
                                    :
                                    <li>
                                        <h1 className="text-lg text-primary mt-1">No Folder</h1>
                                    </li>
                            }

                        </ul>
                    </div>
                    <div className="flex justify-end gap-3 mt-5">
                        <button
                            onClick={() => setOpen(false)}
                            className="btn btn-outline btn-sm">Cancel</button>
                        <button
                            onClick={handler}
                            className="btn btn-primary btn-sm">
                            {
                                mode === "copy" ? "Copy" : "Move"
                            }
                        </button>
                    </div>
                </DialogBody>

            </Dialog>
        </>
    );
}

// Copy Movie Dialog