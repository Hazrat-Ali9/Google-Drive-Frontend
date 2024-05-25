import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { api } from "../axios/api";
import { toast } from 'react-hot-toast';
import Loader from "../Loader";

export function DownloadFolderDialog({ open, setOpen, folder }) {
    const size = folder?.size
    const [percent, setPercent] = React.useState(0);
    const [error, setError] = React.useState("");
    const handleOpen = () => setOpen(!open);
    const [isLoading, setIsLoading] = React.useState(false)
    const download = async () => {
        try {
            const config = {
                onDownloadProgress: progressEvent => {
                    const { loaded } = progressEvent;
                    setPercent(loaded);
                }
            };
            setIsLoading(true)
            const response = await api.get(`/folder/download/${folder?._id}`, {
                responseType: 'blob',
                ...config
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${folder?.name}.zip`);
            document.body.appendChild(link);
            link.click();
            // Clean up the URL object after the download is complete
            window.URL.revokeObjectURL(url);
            setIsLoading(false)
            toast.success("File downloaded successfully")
            setError("")
        } catch (error) {
            setError("Something went wrong please try again later")
        }
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader >Download ({folder?.files}) files</DialogHeader>
                <DialogBody>
                    <h3>
                        Total size: {folder?.size?.toFixed(2)} MB
                        <br />
                        Downloading: {percent / 1024 / 1024 > 1024 ? `${(percent / 1024 / 1024 / 1024).toFixed(2)} GB` : percent / 1024 / 1024 > 1 ? `${(percent / 1024 / 1024).toFixed(2)} MB` : `${(percent / 1024).toFixed(2)} KB`}
                    </h3>
                    <div className="flex justify-center">
                        <div className="radial-progress" style={{ "--value": Math.round((percent * 100) / folder?.size * 1024 * 1024) }} role="progressbar">

                            {(Math.round((percent * 100)) / (folder?.size * 1024 * 1024)).toFixed(2)}%
                        </div>
                    </div>
                    <Button onClick={download} className="mx-auto block mt-2">
                        Download
                    </Button>
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
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
// Download Diagram