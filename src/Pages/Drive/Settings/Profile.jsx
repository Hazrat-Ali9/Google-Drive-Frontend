import { Button } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../Components/axios/api';
import { useDispatch } from 'react-redux';
import { setReloadUser } from '../../../redux/Slice/reloadSlice';
import { toast } from 'react-hot-toast';
import Avater from '../../../Components/Card/Avater';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { imageurl } from '../../../helper/imageUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [link, setLink] = useState("")
    const formHandeler = async (e) => {
        e.preventDefault()
        const target = new FormData(e.target)
        const data = Object.fromEntries(target.entries())
        try {
            const res = await api.put(`/user/${user?._id}`, data)
            dispatch(setReloadUser(res.data))
            toast.success("Name Changed Successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const token = Cookie.get('authToken')
    const changePassword = async (e) => {

    }
    const [image, setImage] = useState(null)
    const changeProfileImage = async (e) => {
        const file = image
        if (!file) return
        const formData = new FormData()
        formData.append("file", file)
        try {
            const res = await fetch('http://localhost:4500/api/file/single', {
                method: "POST",
                headers: {
                    userid: user?._id,
                    token: token
                },
                body: formData
            })
            const data = await res.json()
            const res1 = await api.put(`/user/${user?._id}`, { picture: data?.path })
            dispatch(setReloadUser(res1.data))
            toast.success("Profile Image Changed Successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }


    useEffect(() => {
        if (image) {
            // generate public url for the image
            const url = URL.createObjectURL(image)
            setLink(url)
        }
    }, [image])

    useEffect(() => {
        if (!user) return
        setLink(user?.picture)
    }, [user])
    return (
        <div>
            <h1 className='text-lg'>Update name and profile image</h1>
            <h1 className='text-base mt-5'>
                Email : {user?.email}
            </h1>
            <form onSubmit={formHandeler} className='max-w-96 mt-5'>
                <Input label="Name"
                    defaultValue={user?.name}
                    name='name'
                />
                <Button className='mt-3' type='submit'>
                    Update
                </Button>
            </form>
            <div className='mt-5 max-w-xs flex flex-col justify-center'>
                <label htmlFor='image' className='cursor-pointer w-20 h-20 relative overflow-hidden rounded-full pc'>
                    <Avater width={"w-20"} height={"h-20"} src={imageurl(link)} />
                    <div className="overlay">
                        <FontAwesomeIcon icon={faCamera} className='text-2xl text-white' width={20} />
                    </div>
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} className='hidden' type='file' id='image' accept='image/*' />
                <Button className='mt-3'
                    onClick={changeProfileImage}
                >
                    Update Profile Image
                </Button>
            </div>
        </div>
    );
};

export default Profile;

// Profile