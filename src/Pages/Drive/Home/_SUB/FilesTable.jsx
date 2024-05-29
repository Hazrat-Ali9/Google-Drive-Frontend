import { Checkbox } from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { api } from "../../../../Components/axios/api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const TABLE_HEAD = ["Name", "Created By", "Size", "Created", "Last Modified", "Actions"];
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { filesize } from "../../../../helper/fileSize";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setReloadUser } from "../../../../redux/Slice/reloadSlice";
import Loader from "../../../../Components/Loader";
const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
        date: "23/04/18",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
    },
    {
        name: "Laurent Perrier",
        job: "Executive",
        date: "19/09/17",
    },
    {
        name: "Michael Levi",
        job: "Developer",
        date: "24/12/08",
    },
    {
        name: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
    },
];

export function FilesTable() {
    const [selected, setSelected] = useState([]);
    const { user } = useSelector((state) => state.user)
    const { reloadFiles } = useSelector((state) => state.reload)
    const { data: files, isLoading, refetch } = useQuery({
        queryKey: ["files", user?._id, reloadFiles],
        queryFn: async () => {
            if (user?.role === "admin") {
                const data  = await api.get(`/file`);
                return data;
            }
            else {
                const { data } = await api.get(`/file/user/${user?._id}`);
                return data;
            }
        },
    });
    const dispatch = useDispatch()
    const selectAll = () => {
        if (selected.length === files?.data?.length) {
            setSelected([]);
        } else {
            setSelected(files?.data);
        }
    }
    const selectOne = (file) => {
        if (selected?.filter((item) => item?._id === file?._id).length > 0) {
            setSelected(selected?.filter((item) => item?._id !== file?._id));
        }
        else {
            setSelected([...selected, file]);
        }
    }
    const deleteFile = async (id) => {
        try {
            const res = await api.post(`/file/bin/${id}`)
            toast.success("File deleted successfully")
            dispatch(setReloadUser(res))
            refetch()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const [loading, setLoading] = useState(false)
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
    if (isLoading || loading) {
        return <Loader />
    }
    return (
        <Card className="h-auto w-full  mt-10 bg-white overflow-auto">
            <table className="w-full min-w-max table-auto  text-left">
                <thead>
                    <tr>
                        <th className="border-b border-blue-gray-100 bg-white p-4">
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button"
                                    className="flex gap-2 items-center"
                                >
                                    <Checkbox checked={selected.length === files?.data?.length} onChange={selectAll} />
                                    {
                                        selected.length > 0 &&
                                        <p className="text-sm font-normal">
                                            Selected {selected.length}
                                        </p>
                                    }
                                </div>
                                {
                                    selected.length > 0 && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <button
                                                onClick={deleteFiles}
                                                className="btn btn-sm btn-error text-white">Delete Selected Files</button>
                                        </li>
                                    </ul>
                                }
                            </div>

                        </th>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-white p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {files?.data?.map((file, index) => (
                        <tr key={file?._id} className="even:bg-blue-gray-50/50 text-sm">
                            <td className="p-4">
                                <Checkbox checked={
                                    selected.filter((item) => item?._id === file?._id).length > 0
                                }
                                    onChange={() => selectOne(file)}
                                />
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {(file?.originalname).substr(-30)}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {file?.user?.name}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs" >
                                    {
                                        filesize(file?.size)
                                    }
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {
                                        moment(file?.createdAt).format("MMM Do YY")
                                    }
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal text-xs">
                                    {
                                        moment(file?.updatedAt).format("MMM Do YY")
                                    }
                                </Typography>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center">
                                    <button className="btn btn-link text-primary">
                                        <FontAwesomeIcon icon={faLink} width={20} />
                                    </button>
                                    <div className="dropdown dropdown-end">
                                        <button tabIndex={0} role="button">
                                            <FontAwesomeIcon icon={faEllipsisV} width={20} />
                                        </button>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>
                                                <button className="text-primary">Edit</button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => deleteFile(file?._id)}
                                                    className="text-error">Delete</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}
// Files Table