import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Settings = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    return (
        <div className='lg:p-5 h-full w-full'>
            <h1 className='text-2xl font-semibold'>Account settings</h1>
            <p>
                View and update your account details, profile and more.
            </p>
            <div className="lg:flex gap-5">
                <div className='lg:block hidden'>
                    <Sidebar />
                </div>
                <div className='lg:hidden relative'>
                    <button onClick={() => setShowSidebar(!showSidebar)} className='text-2xl btn'>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {
                        showSidebar && <div className='absolute top-14 left-0 w-full bg-white z-50'>
                            <Sidebar setShowSidebar={setShowSidebar}/>
                        </div>
                    }
                </div>

                <section className='w-full bg-white mt-5 lg:p-5'>
                    <Outlet />
                </section>
            </div>
        </div>
    );
};

export default Settings;