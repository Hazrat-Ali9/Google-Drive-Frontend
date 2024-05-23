import React from 'react';
import googleIcon from './google.png'
const Google = () => {
    return (
        <div>
            <h1 className='text-2xl'>You are using google account</h1>
            <img
                className='max-w-[250px] mt-5'
                src={googleIcon}
                alt="" />
        </div>
    );
};

export default Google;