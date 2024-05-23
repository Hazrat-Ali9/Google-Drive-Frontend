import { Avatar } from '@material-tailwind/react';
import React from 'react';

const Avater = ({ height, width, src }) => {
    return (
        <div>
            <Avatar src={src || "https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar"
                className={`${height} ${width}`}
            />
        </div>
    );
};

export default Avater;