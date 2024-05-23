import { Image } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { imageurl } from '../../helper/imageUrl';
import { filesize } from '../../helper/fileSize';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { fileIconProvider } from '../../Pages/Drive/Files/file_icon_provider';
import { useDispatch } from 'react-redux';
import { setSelectedFile, setShowFileInfo } from '../../redux/Slice/toolsSlice';
import { Chip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const FileInfo = () => {
    const dispatch = useDispatch()
    const { selectedFile } = useSelector(state => state.tools)
    return (
        <div className='min-w-[270px] max-w-[280px] bg-white p-5 rounded'>
            <button className='text-xl float-end hover:text-primary'
                onClick={() => {
                    dispatch(setShowFileInfo(false))
                    dispatch(setSelectedFile(null))
                }}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                />
            </button>
            <h1 className='text-xl text-primary'>File Info</h1>
            <p className='text-sm mt-5'>{selectedFile?.originalname}</p>
            {
                selectedFile?.mimetype?.startsWith("image") ?
                    <Image
                        src={imageurl(selectedFile?.path)}
                        alt='file'
                        className='mt-5 rounded'
                    />
                    :
                    <img
                        loading='lazy'
                        className='max-h-[200px] mt-5 w-full object-cover'
                        src={fileIconProvider(selectedFile?.extension)} alt="" />
            }
            <h1 className='text-lg mt-3 text-primary'>Properties</h1>
            <ul className='mt-3 properties'>
                <li>
                    <p>
                        Owner : <span>{selectedFile?.user?.name}</span>
                    </p>
                </li>
                <li>
                    <p className='flex items-center'>
                        Location : <span>{
                            selectedFile?.folder ?
                                <Link to={`/drive/folders?folder=${selectedFile?.folder?._id}`}>
                                    <Chip color="amber" size="sm" value={selectedFile?.folder?.name}
                                        className='ml-2'
                                    />
                                </Link>

                                :
                                <Chip color="amber" size="sm" value="Root"
                                    className='ml-2'
                                />
                        }</span>
                    </p>
                </li>
                <li>
                    <p>
                        Size : <span>{filesize(selectedFile?.size)}</span>
                    </p>
                </li>
                <li>
                    <p>
                        Modified At : <span>
                            {moment(selectedFile?.updatedAt).format("MMMM Do YYYY")}
                        </span>
                    </p>
                </li>
                <li>
                    <p>
                        Created At : <span>
                            {moment(selectedFile?.createdAt).format("MMMM Do YYYY")}
                        </span>
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default FileInfo;