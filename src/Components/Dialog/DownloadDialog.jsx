import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { api } from "../axios/api";
import { useEffect } from "react";

export function DownloadDialog({ open, setOpen, selected }) {
    const size = selected.reduce((a, b) => a + b?.size, 0)
    const [percent, setPercent] = React.useState(0);
    const [error, setError] = React.useState("");
    const handleOpen = () => setOpen(!open);
    const download = async () => {
        try {
            const config = {
                onDownloadProgress: progressEvent => {
                    const { loaded } = progressEvent;
                    setPercent(loaded);
                }
            };
            if (selected.length === 1) {
                const response = await api.get(`/file/download/${selected[0]?._id}`, {
                    responseType: 'blob',
                    ...config
                },);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', selected[0]?.originalname);
                document.body.appendChild(link);
                link.click();
                // Clean up the URL object after the download is complete
                window.URL.revokeObjectURL(url);
            }
            else if (selected.length > 1) {
                const files = [];
                selected.map((item) => {
                    files.push(item?._id)
                })
                const response = await api.post(`/file/download`, { ids: files }, {
                    responseType: 'blob',
                    ...config
                })
                // console.log(res)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', "Files.zip");
                document.body.appendChild(link);
                link.click();
                // Clean up the URL object after the download is complete
                window.URL.revokeObjectURL(url);

            }
            setError("")
        } catch (error) {
            setError("Something went wrong please try again later")
        }
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader >Download ({selected?.length}) files</DialogHeader>
                <DialogBody>
                    <h3>
                        Total size: {size / 1024 / 1024 > 1024 ? `${(size / 1024 / 1024 / 1024).toFixed(2)} GB` : size / 1024 / 1024 > 1 ? `${(size / 1024 / 1024).toFixed(2)} MB` : `${(size / 1024).toFixed(2)} KB`}
                        <br />
                        Downloading: {percent / 1024 / 1024 > 1024 ? `${(percent / 1024 / 1024 / 1024).toFixed(2)} GB` : percent / 1024 / 1024 > 1 ? `${(percent / 1024 / 1024).toFixed(2)} MB` : `${(percent / 1024).toFixed(2)} KB`}
                    </h3>
                    <div className="flex justify-center">
                        <div className="radial-progress" style={{ "--value": Math.round((percent * 100) / size) }} role="progressbar">{Math.round((percent * 100) / size)}%</div>
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

// Download Dialog