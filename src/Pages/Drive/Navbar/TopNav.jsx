import React from 'react';
import Logo from '../../../Components/Global/Logo/Logo';
import Search_Bar from './Search_Bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { logOut } from '../../../helper/auth';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setShowSidebar } from '../../../redux/Slice/toolsSlice';
import Avater from '../../../Components/Card/Avater';
import { imageurl } from '../../../helper/imageUrl';


const TopNav = () => {
    const { showSidebar } = useSelector(state => state.tools)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const links = [
        {
            name: "My Files",
            icon: faFolderOpen,
            Path: "/drive/files"
        },
        {
            name: "Account Settings",
            icon: faGear,
            Path: "/drive/settings"
        },
    ]
    const handleToogle = () => {
        dispatch(setShowSidebar(!showSidebar))
    }
    return (
        <nav className='lg:flex justify-between px-7 py-3 bg-white items-center'>
            <div className="flex justify-between w-full items-center">
                <section className='flex items-center'>
                    <div className="mr-10">
                        <Logo />
                    </div>
                    <div className="lg:block hidden">
                        <Search_Bar />
                    </div>
                </section>
                <section className='flex items-center gap-5'>
                    <button className='text-2xl'>
                        <FontAwesomeIcon icon={faBell} width={20} height={20} />
                    </button>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="m-1 flex items-center justify-center">
                            <div className="avatar">
                                <div className="w-9 rounded-full">
                                    <Avater width={"w-7"} height={"h-7"} src={imageurl(user?.picture)} />
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ">
                            {
                                links.map((link, index) => {
                                    return (
                                        <li key={index}>
                                            <Link className="justify-start gap-3 items-center text-base flex" to={link.Path}>
                                                <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                                                {link.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                            <li>
                                <button
                                    onClick={(e) => {
                                        logOut()
                                    }}
                                    className="justify-start gap-3 items-center text-base flex" >
                                    <FontAwesomeIcon icon={faRightFromBracket} width={20} height={20} />
                                    {"Logout"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </section>
                <button className='text-2xl lg:hidden block'
                    onClick={handleToogle}
                >
                    {
                        !showSidebar ?
                            <FontAwesomeIcon icon={faBars} width={30} height={30} />
                            :
                            <FontAwesomeIcon icon={faBarsStaggered} width={30} height={30} />
                    }
                </button>
            </div>
            <div className="lg:hidden flex justify-center mt-2 w-full">
                <Search_Bar />
            </div>
        </nav>
    );
};

export default TopNav;

// Top Nav