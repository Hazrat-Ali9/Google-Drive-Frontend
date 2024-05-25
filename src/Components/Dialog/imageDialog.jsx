import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
    IconButton,
    Typography,
    Card,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { api } from "../axios/api";
import { faX } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export function DialogWithImage({ path, file }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen((cur) => !cur);
    const [loading, setLoading] = React.useState(false)
    const dowloadFile = async (id) => {
        try {
            setLoading(true)
            const response = await api.get(`/file/download/${file?._id}`, {
                responseType: 'blob' // Ensure response is treated as binary data
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file?.originalname);
            document.body.appendChild(link);
            link.click();
            // Clean up the URL object after the download is complete
            window.URL.revokeObjectURL(url);
            setLoading(false)
            toast.success("File downloaded successfully")
            setOpen(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
            setLoading(false)
        }
    }

    return (
        <>
            <Card
                className="h-full w-full cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                onClick={handleOpen}
            >
                <img
                    alt="nature"
                    className="h-full w-full object-cover object-center"
                    src={path}
                />
            </Card>
            <Dialog size="xl" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">

                    <div className="flex items-center gap-2">

                        <Button color="gray" size="sm"
                            onClick={dowloadFile}
                            loading={loading}
                        >
                            <FontAwesomeIcon icon={faDownload} />   Download
                        </Button>
                    </div>
                    <button>
                        <IconButton variant="text" color="red" onClick={handleOpen}>
                            <FontAwesomeIcon icon={faX} />
                        </IconButton>
                    </button>
                </DialogHeader>
                <DialogBody className="max-h-[80vh]">
                    <img
                        alt="nature"
                        className="h-[48rem]"
                        src={path}
                    />
                </DialogBody>
                <DialogFooter className="justify-between">
                    <div className="flex items-center gap-16">
                        <div>
                            <Typography variant="small" color="gray" className="font-normal">
                                Views
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                44,082,044
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="small" color="gray" className="font-normal">
                                Downloads
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                553,031
                            </Typography>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="blue-gray"
                        className="mr-5 flex items-center"
                    >
                        Share
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

// Image Diagram 