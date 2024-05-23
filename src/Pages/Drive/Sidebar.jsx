import React from 'react';
// import Logo from '../../Components/Global/Logo/Logo';
// import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
// import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { Dropdown, Menu } from 'antd';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import { faFolderClosed } from '@fortawesome/free-regular-svg-icons';
// import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faFileZipper } from '@fortawesome/free-regular-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Progress } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { UploadDialog } from '../../Components/Dialog/UploadDialog';
import { useLocation } from 'react-router-dom';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CreateFolder } from '../../Components/Dialog/CreateFolder';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';



const links = [
    {
        name: "Home",
        icon: faHome,
        path: "/drive"
    },
    {
        name: "Files",
        icon: faFile,
        path: "/drive/files"
    },
    {
        name: "Folders",
        icon: faFolderOpen,
        path: "/drive/folders"
    },
    {
        name: "Shared",
        icon: faCircleNodes,
        path: "/drive/shared"
    },
    {
        name: "Recent",
        icon: faFolder,
        path: "/drive/recent"
    },
    {
        name: "Recovery",
        icon: faTrashCan,
        path: "/drive/recovery"
    },
    {
        name: "Settings",
        icon: faGear,
        path: "/drive/settings"
    }
]


const linksAdmin = [
    {
        name: "Home",
        icon: faHome,
        path: "/drive"
    },
    {
        name: "All Files",
        icon: faFile,
        path: "/drive/files"
    },
    {
        name: "All Folders",
        icon: faFolderOpen,
        path: "/drive/folders"
    },
    {
        name: "Settings",
        icon: faGear,
        path: "/drive/settings"
    }
]

const Sidebar = ({ hideSidebar }) => {
    const { user } = useSelector((state) => state.user)
    const location = useLocation()
    const [open, setOpen] = useState('')
    const [show, setShow] = useState(false)

    const [openUpload, setOpenUpload] = useState(false)
    return (
        <div className='w-[320px] bg-white h-full overflow-y-auto py-5 rounded'

        >
            {
                user?.role === "admin" && <h1 className='text-2xl text-center font-semibold text-primary mb-5'>Admin</h1>
            }
            <UploadDialog open={openUpload} setOpen={setOpenUpload} />
            <ul className=''>
                {
                    (user?.role === "admin" ? linksAdmin : links).map((link, index) => (
                        <li key={index} className='' >
                            <div className='flex items-center'>
                                <Link
                                    onClick={hideSidebar}
                                    to={link.path} className={`flex items-center gap-5 text-[16px] leading-6 py-3 hover:bg-black font-semibold w-full pl-8  text-blue-gray-700 hover:text-white ${location.pathname === link.path ? 'bg-black text-white shadow' : ''}`}>
                                    <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                                    <span>
                                        {link.name}
                                    </span>
                                </Link>
                                {
                                    link.children && <button className='pl-4 pr-5'
                                        onClick={() => setOpen(open === index ? '' : index)}
                                    >
                                        {
                                            open === index ? <FontAwesomeIcon icon={faChevronUp} width={20} height={20} /> : <FontAwesomeIcon icon={faChevronDown} width={20} height={20} />
                                        }
                                    </button>
                                }
                            </div>

                            {
                                link.children && open === index && (
                                    <ul>
                                        {
                                            link.children.map((child, index) => (
                                                <li key={index} 
                                                onClick={hideSidebar}
                                                className='pl-14 hover:bg-gray-100 '>
                                                    <Link to="/drive" className='flex items-center gap-5 font-normal text-[17px] py-3'>
                                                        <FontAwesomeIcon icon={child.icon} width={20} height={20} />
                                                        <span>
                                                            {child.name}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </li>
                    ))
                }
                <li className='ml-8 mt-5'>
                    <div className="dropdown">
                        <button
                            tabIndex={0} role="button"
                            className='btn btn-primary rounded w-[200px]'>
                            <FontAwesomeIcon icon={faPlus} width={20} height={20} />
                            <span>Upload</span>
                        </button>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[300px]">
                            <li>
                                <button
                                    tabIndex={0} role="button"
                                    onClick={() => {
                                        setOpenUpload(true)
                                    }}
                                    className='btn btn-primary rounded w-full'>
                                    <FontAwesomeIcon icon={faCloudArrowUp} width={20} height={20} />
                                    <span>Upload Files</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    tabIndex={0} role="button"
                                    onClick={() => {
                                        setShow(true)
                                    }}
                                    className='btn bg-black text-white rounded w-full mt-2 hover:bg-black'>
                                    <FontAwesomeIcon icon={faPlus} width={20} height={20} />
                                    <span>Create New Folder</span>
                                </button>
                            </li>

                        </ul>
                    </div>
                </li>
            </ul>
            <CreateFolder open={show} setOpen={setShow} />
            <div className='pl-8 mt-5 pr-5'>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faDatabase} width={20}
                            className='text-primary'
                        />
                        <h5 className='text-[13px] font-semibold '>
                            Storage
                        </h5>
                    </div>
                    <button className='btn btn-link text-primary'>
                        Upgrade
                    </button>
                </div>
                <Progress value={((user?.storage) / user?.storageMax) * 100} max={100} size="sm"
                    color="green"
                    style={{ backgroundColor: "#D9D9D9" }}
                />
                <h5 className='mt-3 text-sm'>
                    {((user?.storage) / 1024).toFixed(2)} GB of {((user?.storageMax) / 1024)} GB used
                </h5>
            </div>
        </div>
    );
};

export default Sidebar;
