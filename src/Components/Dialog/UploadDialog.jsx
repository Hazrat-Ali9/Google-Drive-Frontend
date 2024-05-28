import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useSelector } from "react-redux";
import Cookie from 'js-cookie';
import { useDispatch } from "react-redux";
import { setReloadFiles, setReloadUser } from "../../redux/Slice/reloadSlice";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const { Dragger } = Upload;
export function UploadDialog({ open, setOpen }) {
    const dispatch = useDispatch()
    const token = Cookie.get('authToken')
    const { user } = useSelector((state) => state.user)
    const handleOpen = () => setOpen(!open);
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const folder = searchParams.get('folder')
    const [error, setError] = useState("")
    const props = {
        name: 'file',
        action: 'http://localhost:4500/api/file/upload',
        headers: {
            authorization: 'authorization-text',
            userid: user?._id,
            token: token,
            folder: folder
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // setPercent(0);
            }
            if (info.file.status === 'done') {
                // setPercent(100);

            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setError(info.fileList[0]?.response?.message)
            }
            dispatch(setReloadFiles(info.file))
            dispatch(setReloadUser(info.file))
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,

        },
    };
    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Upload Files</DialogHeader>
                <DialogBody >
                    {error && <p className="text-red-500  pb-4">{error}</p>}
                    <Dragger {...props} multiple>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
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
// Upload Dialog