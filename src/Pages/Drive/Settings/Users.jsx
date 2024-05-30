import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../Components/axios/api';
import Loader from '../../../Components/Loader';
import UserTable from './UserTable';

const Users = () => {
    const { user } = useSelector((state) => state.user)
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ["users", user?._id],
        queryFn: async () => {
            const { data } = await api.get(`/user`);
            return data;
        },
        enabled: !!user
    });
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='w-full'>
            <UserTable users={users} refetch={refetch}/>
        </div>
    );
};

export default Users;
// Users