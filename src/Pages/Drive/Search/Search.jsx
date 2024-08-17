import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../../Components/axios/api';
import { useSelector } from 'react-redux';
import Loader from '../../../Components/Loader';
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DownloadDialog } from '../../../Components/Dialog/DownloadDialog';
import { toast } from 'react-hot-toast';
import FileCard from '../Files/FileCard';
import RecentFolderCard from '../../../Components/Card/RecentFolderCard';
// Search param 
const Search = ({ mode }) => {
    const { user } = useSelector((state) => state.user)
    const { reloadFiles, reloadFolder } = useSelector((state) => state.reload)
    const { files, folders } = useSelector((state) => state.search)
    const location = useLocation()

    // const searchParams = new URLSearchParams(location.search);
    // const category = searchParams.get("category");
    // const folder = searchParams.get("folder");
    // const type = searchParams.get("type");



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
    // console.log(selected.length)
    // if (isLoading || loading) {
    //     return <Loader />
    // }
    return (
        <div className='w-full lg:px-5'>
            {
                openDownload && <DownloadDialog open={openDownload} setOpen={setOpenDownload} selected={selected} />
            }
            <h1 className='text-xl font-semibold'>
                Search Results
            </h1>
            {
                files?.length > 0 &&
                <div className="flex gap-5 items-center">
                    <div className="flex items-center">
                        <Checkbox
                            checked={selected.length === files?.length}
                            onChange={() => {
                                if (selected.length === files?.length) {
                                    setSelected([])
                                }
                                else {
                                    setSelected(files)
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
                                <button className='text-[16px] hover:text-green-600 mt-1 ' title='Share Link'>
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
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                {
                    folders?.data?.map((folder, index) => (
                        <RecentFolderCard data={folder} key={index} />
                    ))
                }
            </div>
            <div className={`${files?.length > 0 && "file-container"}  mt-5`}>

                {
                    files?.map((file, index) => (
                        <FileCard
                            onClick={() => selectOne(file)}
                            data={file}
                            key={index}
                            mode={mode}
                            index={index}
                            selected={selected.filter((item) => item?._id === file?._id).length > 0}
                        />
                    ))

                }
            </div>
        </div>
    );
};

export default Search;