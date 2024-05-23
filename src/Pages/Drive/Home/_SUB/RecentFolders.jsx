import React from 'react';
import RecentFolderCard from '../../../../Components/Card/RecentFolderCard';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { api } from '../../../../Components/axios/api';
import Loader from '../../../../Components/Loader';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay } from 'swiper/modules';

const RecentFolders = () => {
    const { user } = useSelector((state) => state.user)
    const { reloadFolder } = useSelector((state) => state.reload)
    const { data: folders, isLoading } = useQuery({
        queryKey: ["folders", user?._id, reloadFolder],
        queryFn: async () => {
            if (user?.role === "admin") {
                const { data } = await api.get(`/folder`);
                return data;
            }
            else {
                const { data } = await api.get(`/folder/user/${user?._id}`);
                return data;
            }
        },
    });
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='pt-10 w-full'>
            <h1 className='text-xl font-semibold'>Recent Folders</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5'>


            </div>
            {
                folders?.data?.length > 0 ?
                    <Swiper

                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },

                        }}
                        spaceBetween={30}
                        loop={true}
                        modules={[Autoplay]}
                        className="mySwiper">
                        {
                            folders?.data?.map((folder, index) => (
                                <SwiperSlide key={folder?._id || index}>
                                    <RecentFolderCard data={folder} key={index}/>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                    :
                    <h1 className='text-base text-primary font-semibold'>No Folders Found</h1>
            }


        </div>
    );
};

export default RecentFolders;