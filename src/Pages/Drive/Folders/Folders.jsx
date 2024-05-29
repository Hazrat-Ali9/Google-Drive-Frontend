import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../../Components/axios/api';
import { useSelector } from 'react-redux';
import Loader from '../../../Components/Loader';
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DownloadDialog } from '../../../Components/Dialog/DownloadDialog';
import { toast } from 'react-hot-toast';
import FileCard from '../Files/FileCard';
import RecentFolderCard from '../../../Components/Card/RecentFolderCard';
import { ShareDialog } from '../../../Components/Dialog/ShareDialog';

const Folders = ({ mode }) => {
    const { user } = useSelector((state) => state.user)
    const { reloadFiles, reloadFolder } = useSelector((state) => state.reload)
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const folder = searchParams.get("folder");
    const { data: files, isLoading, refetch } = useQuery({
        queryKey: ["files", user?._id, reloadFiles, folder],
        queryFn: async () => {
            if (folder === null) {
                return {
                    data: []
                }
            }
            else {
                const { data } = await api.post(`/file/folder?limit=500`, {
                    folder,
                    user: user?._id
                });
                return data;
            }
        },
        enabled: !!user
    });

    const { data: folders, isLoading: isFolderLoading } = useQuery({
        queryKey: ["folders", user?._id, reloadFolder, folder],
        queryFn: async () => {
            if (folder === null) {
                const { data } = await api.get(`/folder/user/${user?._id}`);
                return data;
            }
            else {
                return {
                    data: []
                }
            }
        },
    });

    const { data: subFolders, isLoading: isSubFolderLoading } = useQuery({
        queryKey: ["subfolder", user?._id, reloadFolder, folder],
        queryFn: async () => {
            if (folder !== null) {
                const { data } = await api.get(`/folder/folder/${folder}`);
                return data;
            }
            else {
                return {
                    data: []
                }
            }
        },
    });
    const [selected, setSelected] = useState([]);
    const selectOne = (file) => {
        if (selected?.filter((item) => item?._id === file?._id).length > 0) {
            setSelected(selected?.filter((item) => item?._id !== file?._id));
        }
        else {
            setSelected([...selected, file]);
        }
    }

    const [loading, setLoading] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const deleteFiles = async () => {
        const confirm = window.confirm("Are you sure you want to delete selected files?")
        if (!confirm) return
        setLoading(true)
        try {
            const res = await api.post('/file/update', { ids: selected.map((item) => item?._id), update: { deleted: true } })
            refetch()
            setLoading(false)
            toast.success("File moved to bin successfully")
            setSelected([])
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
            setLoading(false)
        }
    }
    const deletePermanently = async () => {
        const confirm = window.confirm("Are you sure you want to delete selected files permanently?")
        if (!confirm) return
        setLoading(true)
        try {
            const res = await api.post('/file/delete', { ids: selected.map((item) => item?._id) })
            refetch()
            setLoading(false)
            toast.success("File deleted successfully")
            setSelected([])
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
            setLoading(false)
        }
    }
    const [share, setShare] = useState(false)
    // console.log(selected.length)
    if (isLoading || loading || isFolderLoading || isSubFolderLoading) {
        return <Loader />
    }
    return (
        <div className='w-full lg:px-5'>
            {
                openDownload && <DownloadDialog open={openDownload} setOpen={setOpenDownload} selected={selected} />
            }
            {
                share && <ShareDialog open={share} setOpen={setShare} selected={selected} />
            }
            <h1 className='text-xl font-semibold'>{
                files?.folder?.name
            }</h1>
            {
                files?.data?.length > 0 && <div className="flex gap-5 items-center">
                    <div className="flex items-center">
                        <Checkbox
                            checked={selected.length === files?.data?.length}
                            onChange={() => {
                                if (selected.length === files?.data?.length) {
                                    setSelected([])
                                }
                                else {
                                    setSelected(files?.data)
                                }
                            }}
                            color="warning" size='small' />
                        <h5 className="ml-2 text-sm">
                            <span className=' mr-1'>
                                {selected.length}
                            </span>
                            Selected
                        </h5>
                    </div>

                    {
                        mode === "recovery" ?
                            selected.length > 0 &&
                            <div className='flex gap-5'>
                                <button className='text-[16px] hover:text-red-600 mt-1 ' title='Move to Trash'
                                    onClick={deletePermanently}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                    <span className='text-sm ml-1'>Empty Bin</span>
                                </button>
                            </div>
                            :
                            selected.length > 0 &&
                            <div className='flex gap-5'>
                                <button className='text-[16px] hover:text-red-600 mt-1 ' title='Move to Trash'
                                    onClick={deleteFiles}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                                <button className='text-[16px] hover:text-green-600 mt-1 ' title='Share Link'
                                onClick={() => setShare(true)}
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                                <button
                                    onClick={() => setOpenDownload(true)}
                                    className='text-[16px] hover:text-primary mt-1 ' title='Share Link'>
                                    <FontAwesomeIcon icon={faDownload} />
                                </button>
                            </div>
                    }
                </div>
            }
            {
                typeof folder === "string" ?
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                        {
                            subFolders?.data?.map((folder, index) => (
                                <RecentFolderCard data={folder} key={index} />
                            ))
                        }
                    </div>
                    :
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                        {
                            folders?.data?.map((folder, index) => (
                                <RecentFolderCard data={folder} key={index} />
                            ))
                        }
                    </div>
            }
            {
                folder !== null && <div className={`${files?.data?.length > 0 && "file-container justify-center"} lg:mt-10 mt-5`}>
                    {
                        files?.data?.length > 0 ?
                            files?.data?.map((file, index) => (
                                <FileCard
                                    onClick={() => selectOne(file)}
                                    refetch={refetch}
                                    data={file}
                                    key={index}
                                    mode={mode}
                                    index={index}
                                    selected={selected.filter((item) => item?._id === file?._id).length > 0}
                                />
                            ))
                            :
                            <h1 className='text-base text-primary font-semibold'>{
                                mode === "recovery" ? "Your Recycle Bin is empty" : "No Files Found"
                            }</h1>
                    }
                </div>
            }
        </div>
    );
};

export default Folders;
// Folders jsx