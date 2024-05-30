import { Card, Typography } from "@material-tailwind/react";
import { CheckBox } from "@mui/icons-material";
import UserCard from "./UserCard";
import { Chip } from "@material-tailwind/react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import UpdateDialog from "../../../Components/Dialog/UpdateDialog";

const TABLE_HEAD = ["User", "Role", "Created", "Actions"];


export default function UserTable({ users, refetch }) {
    const [selected, setSelected] = useState({});
    const selecOne = (user) => {
        setSelected(user)
    }

    const [mode, setMode] = useState("info");
    const [open, setOpen] = useState(false)

    return (
        <Card className="max-h-screen w-full overflow-scroll">
            <UpdateDialog open={open} setOpen={setOpen} user={selected}
                refetch={refetch} mode={mode} setMode={setMode}
            />
            <table className="w-full min-w-max table-auto text-left">
                <thead>

                    <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">

                        </th>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
                    {users?.map((user, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Checkbox
                                    onChange={() => selecOne(user)}
                                    checked={selected?._id === user?._id}
                                />
                            </td>
                            <td>
                                <UserCard user={user} />
                            </td>
                            <td className="p-4">
                                <Chip
                                    value={user?.role}
                                    color="orange"
                                    size="sm"
                                    className="w-[100px]"
                                />
                            </td>
                            <td className="p-4">
                                <h1
                                    className="text-sm"
                                >{moment(user?.createdAt).format("MMMM Do YYYY")}</h1>
                            </td>
                            <td className="p-4">
                                <div className="flex gap-5">
                                    <button
                                        onClick={() => {
                                            setOpen(true)
                                            setMode("info")
                                            setSelected(user)
                                        }}
                                        className="hover:text-primary">
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>

                                    <button className="hover:text-red-500"
                                        onClick={() => {
                                            setOpen(true)
                                            setMode("delete")
                                            setSelected(user)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}

// User Table