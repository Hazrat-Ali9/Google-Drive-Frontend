import React from 'react';
import { fileIconProvider } from './file_icon_provider';
import { imageurl } from '../../../helper/imageUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../../Components/axios/api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Loader from '../../../Components/Loader';
import { Image } from 'antd';
import { Checkbox } from '@mui/material';
import { setSelectedFile } from '../../../redux/Slice/toolsSlice';
import { useSelector } from 'react-redux';

const FileCard = ({ data, refetch, mode, index, onClick, selected }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(false)
    const deleteFile = async (id) => {
        try {
            setLoading(true)
            const res = await api.post(`/file/bin/${id}`)
            setLoading(false)
            toast.success("File deleted successfully")
            refetch && refetch()
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const deletePermanently = async (id) => {
        try {
            setLoading(true)
            const res = await api.delete(`/file/${id}`)
            setLoading(false)
            toast.success("File deleted successfully")
            refetch && refetch()
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const dowloadFile = async (id) => {
        try {
            const response = await api.get(`/file/download/${id}`, {
                responseType: 'blob' // Ensure response is treated as binary data
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', data?.originalname);
            document.body.appendChild(link);
            link.click();
            // Clean up the URL object after the download is complete
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }
    const { selectedFile } = useSelector((state) => state.tools)
    if (loading) {
        return <Loader />
    }
    return (
        <div className={`flex lg:w-[180px] md:w-[140px] w-[150px] shadow-md rounded flex-col p-2 ${selectedFile?._id === data?._id ? "border-2 border-success" : ""} ${(selected && selectedFile?._id !== data?._id) && "border-2 border-primary"}`}
            onClick={() => {
                dispatch(setSelectedFile(data))
            }}
        >
            <div className='pb-2 flex items-center justify-between'>
                <Checkbox
                    size='small'
                    color="warning" onChange={() => {
                        onClick()

                    }} checked={selected} />
                <p className='text-[12px] cursor-pointer'>
                    {data?.filename.slice(0, 8) + "...." + data?.extension}
                </p>
                <div className={`dropdown ${index !== 0 && "dropdown-end"}`}>
                    <button tabIndex={0} role="button">
                        <FontAwesomeIcon icon={faEllipsisV} width={20} />
                    </button>
                    {
                        mode === "recovery" ? <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box text-sm ">
                            <li className='flex'>
                                <button className="text-primary text-end w-full">Edit</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => deletePermanently(data?._id)}
                                    className="text-error">Delete Permanently</button>
                            </li>
                        </ul>
                            :
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button
                                        onClick={() => dowloadFile(data?._id)}
                                        className="text-primary">Dowload</button>
                                </li>
                                {
                                    mode !== 'shared' && <>
                                        <li>
                                            <button className="text-primary">Edit</button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => deleteFile(data?._id)}
                                                className="text-error">Delete</button>
                                        </li>
                                    </>
                                }
                            </ul>
                    }

                </div>
            </div>
            {
                data?.mimetype?.startsWith("image") ?
                    <Image
                        src={imageurl(data?.path)}
                    />
                    :
                    <img
                        loading='lazy'
                        className='max-h-[200px] w-full object-cover'
                        src={fileIconProvider(data?.extension)} alt="" />
            }
        </div>
    );
};

export default FileCard;