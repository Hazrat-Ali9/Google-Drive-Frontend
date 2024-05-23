import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faListDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CategoryCard = ({ icon, }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const onclick = () => {
        // search params
        const updatedQuery = new URLSearchParams({
            category: icon?.path,
        })
      
        navigate(`/drive/files?${updatedQuery}`);
    }
    return (
        <div className='cursor-pointer ' onClick={onclick}>
            <div
                className='flex items-center justify-center p-5 h-[120px] lg:w-[200px]  w-[160px] hover:shadow-md rounded-lg shadow shadow-gray-300 relative'
                style={{
                    backgroundColor: icon.bg || "white"
                }}
            >
                <button className='absolute top-3 right-3 text-blue-gray-700 font-400'>
                    <FontAwesomeIcon icon={faEllipsisV} height={17} />
                </button>
                <img src={icon.icon} width={"70"} height={"70"} alt={icon.name}
                    className='rounded-full  bg-white p-2'
                />
                <span className='absolute bottom-3 left-5 text-gray-100'>
                    <FontAwesomeIcon icon={faStar} />
                </span>
            </div>
            <h1 className='text-center font-semibold pt-2 text-[18px]'
                style={{
                    color: icon.color || "black"
                }}
            >{icon.name}</h1>
        </div>
    );
};

export default CategoryCard;