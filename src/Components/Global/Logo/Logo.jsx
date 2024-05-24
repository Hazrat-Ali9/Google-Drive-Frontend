import React from 'react';
import { svg_icons } from '../../Icons/svg/svg';
import { Link } from 'react-router-dom';
// logo
const Logo = () => {
    return (
        <Link to={'/drive?fsid=0'} className='text-[25px] font-bold text-primary'>
           <img src={svg_icons[1]} width={110} alt="" />
        </Link>
    );
};

export default Logo;