import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
const Loader = () => {
    return (
        <div className='w-full flex justify-center p-5'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 34, color: '#F7931E' }} spin />} />
        </div>
    );
};

export default Loader;