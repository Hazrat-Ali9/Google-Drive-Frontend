import { useSelector } from 'react-redux';
import React from 'react';
import { folder } from '../Icons/File_Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { api } from '../axios/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setReloaFolder, setReloadUser } from '../../redux/Slice/reloadSlice';
import { DownloadFolderDialog } from '../Dialog/DownloadFolderDialog';
import { Dropdown } from 'antd';
import { UpdateFolder } from '../Dialog/UpdateFolder';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { CopyMoveDialog } from '../Dialog/CopyMoveDialog';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


const RecentFolderCard = ({ data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const deleteFolder = async () => {
        try {
            const comfirm = window.confirm("Are you sure you want to delete this folder?")
            if (!comfirm) return
            const res = await api.delete(`/folder/${data?._id}`)
            toast.success("Folder deleted successfully")
            dispatch(setReloaFolder(res.status + 2))
            dispatch(setReloadUser(res.status + 2))
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const [open, setOpen] = useState(false)
    const [copy, setCopy] = useState(false)
    const [mode, setMode] = useState("")

    const [openUpdate, setOpenUpdate] = useState(false)

    return (
        <div className='p-5 bg-white rounded w-full hover:shadow-xl shadow-blue-100 cursor-pointer min-w-full'
            onDoubleClick={() => navigate(`/drive/folders?folder=${data?._id}`)}
        >
            {
                copy && <CopyMoveDialog
                    open={copy}
                    setOpen={setCopy}
                    folder={data}
                    mode={mode}
                />
            }
            {
                open && <DownloadFolderDialog open={open} setOpen={setOpen} folder={data} />
            }
            {
                openUpdate && <UpdateFolder open={openUpdate} setOpen={setOpenUpdate} folder={data} />
            }

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={folder} alt="Folder icon" width={30} />
                    <h2 className='text-[18px] font-normal mt-1'>
                        {data?.name}
                    </h2>
                </div>

                <div>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    label: <button
                                        onClick={() => {
                                            navigate(`/drive/folders?folder=${data?._id}`)
                                        }}
                                        className="text-primary w-[150px]">
                                        <FontAwesomeIcon icon={faFolderOpen}
                                            className='mr-2'
                                        />
                                        Open Folder
                                    </button>,
                                    key: '42g',
                                }, {
                                    label: <button
                                        onClick={() => {
                                            setCopy(true)
                                            setMode("copy")
                                        }}
                                        className="text-primary w-[150px]">
                                        <FontAwesomeIcon icon={faCopy}
                                            className='mr-2'
                                        />
                                        Copy Folder
                                    </button>,
                                    key: '42',
                                },
                                {
                                    label: <button
                                        onClick={() => {
                                            setCopy(true)
                                            setMode("move")
                                        }}
                                        className="text-primary w-[150px]">
                                        <FontAwesomeIcon icon={faFolderOpen}
                                            className='mr-2'
                                        />
                                        Move Folder
                                    </button>,
                                    key: '50',
                                },
                                {
                                    label: <button
                                        onClick={() => setOpen(true)}
                                        className="text-primary w-[150px]">
                                        <FontAwesomeIcon icon={faDownload}
                                            className='mr-2'
                                        />
                                        Dowload
                                    </button>,
                                    key: '0',
                                },
                                {
                                    label: <button
                                        onClick={() => setOpenUpdate(true)}
                                        className="text-primary w-[150px]">
                                        <FontAwesomeIcon icon={faPen}
                                            className='mr-2'
                                        />
                                        Edit
                                    </button>,
                                    key: '1',
                                },
                                {
                                    type: 'divider',
                                },
                                {
                                    label: <button
                                        onClick={() => deleteFolder()}
                                        className="text-error w-[150px]">
                                        <FontAwesomeIcon icon={faTrashCan}
                                            className='mr-2'
                                        />
                                        Delete
                                    </button>,
                                    key: '3',
                                },
                            ],
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <button
                                tabIndex={0}
                                role="button"
                                className='hover:text-red-500'
                            >
                                <FontAwesomeIcon icon={faEllipsisV} width={20} />
                            </button>
                        </a>
                    </Dropdown>
                    <Dropdown
                        placement='bottomLeft'
                        menu={{
                            items: [
                                {
                                    label: <div className='w-[200px]'>

                                        <h1>
                                            <span>
                                                Owner
                                            </span> : {
                                                user?._id === data?.user?._id ? "You" : data?.user?.name
                                            }
                                        </h1>

                                        <h1>
                                            <span>
                                                Size
                                            </span> : {(data?.size).toFixed(2)} MB
                                        </h1>
                                        <h1>
                                            <span>
                                                Created At
                                            </span> : {moment(data?.createdAt).format("DD/MM/YYYY")}
                                        </h1>
                                        <h1>
                                            <span>
                                                Updated At
                                            </span> : {moment(data?.updatedAt).format("DD/MM/YYYY")}
                                        </h1>
                                    </div>,
                                    key: '42',
                                },
                            ],
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <button
                                tabIndex={0}
                                role="button"
                                className='hover:text-red-500'
                            >
                                <FontAwesomeIcon icon={faCircleInfo} width={20} />
                            </button>
                        </a>
                    </Dropdown>
                </div>

            </div>
            <div className="flex items-center mt-2 text-blue-gray-700 gap-2">
                <h5 className='text-sm font-normal'>
                    {(data?.size).toFixed(2)} MB
                </h5>
                <div className="dot" />
                <h5 className='text-sm font-normal'>
                    {data?.files} Items
                </h5>
                <h5 className='text-sm font-normal'>
                    {data?.folders || 0} Folders
                </h5>
            </div>
        </div>
    );
};

export default RecentFolderCard;