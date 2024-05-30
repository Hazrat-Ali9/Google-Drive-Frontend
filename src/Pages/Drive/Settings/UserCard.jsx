import { Avatar } from '@material-tailwind/react';
import React from 'react';
import { imageurl } from '../../../helper/imageUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const UserCard = ({ user }) => {

    return (
        <div className='flex gap-4'>
            <Avatar src={imageurl(user?.picture)}
                alt="avatar"
                variant="rounded"
                className='w-10 h-10'
            />
            <div>
                <h1 className='font-bold text-sm'>{user?.name}
                    {
                        user?.provider === "google" && <FontAwesomeIcon icon={faGoogle} className='ml-3' />
                    }
                </h1>
                <p className='text-sm'>{user?.email}</p>
            </div>
        </div>
    );
};

export default UserCard;
// UserCard