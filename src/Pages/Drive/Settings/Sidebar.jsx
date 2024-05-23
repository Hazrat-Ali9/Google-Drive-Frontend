import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const links = [
    {
        name: "Profile",
        icon: faUser,
        path: "/drive/settings"
    },
    {
        name: "Password",
        icon: faKey,
        path: "/drive/settings/password"
    }
]

const linksAdmin = [
    {
        name: "Profile",
        icon: faUser,
        path: "/drive/settings"
    },
    {
        name: "Password",
        icon: faKey,
        path: "/drive/settings/password"
    },
    {
        name: "Users",
        icon: faUsers,
        path: "/drive/settings/users"
    }
]

const Sidebar = ({ setShowSidebar }) => {
    const { user } = useSelector((state) => state.user)
    const location = useLocation()
    return (
        <div className='min-w-[250px] max-w-[250px] shadow h-[500px]  mt-5 rounded bg-white'>
            <ul className='mt-5'>
                {
                    (user?.role === "admin" ? linksAdmin : links).map((link, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <Link
                                onClick={() => setShowSidebar && setShowSidebar(false)}
                                to={link.path} className={`flex items-center gap-5 text-[16px] leading-6 py-3 hover:bg-primary font-semibold w-full pl-8  text-blue-gray-700 hover:text-white ${location.pathname === link.path ? 'bg-primary text-white shadow' : ''}`}>
                                <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                                <span>
                                    {link.name}
                                </span>
                            </Link>
                        </li>
                    ))
                }

            </ul>
        </div>
    );
};

export default Sidebar;