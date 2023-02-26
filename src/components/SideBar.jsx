import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';
import {logout} from '../features/auth/authSlice'
import { useDispatch } from 'react-redux';


import { BsPerson } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { AiFillHome, AiOutlineContacts } from 'react-icons/ai';
import { MdOutlineCreate, MdLogin, MdOutlineDashboardCustomize } from 'react-icons/md';
import { TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } from 'react-icons/tb';


const SideBarNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state => state.auth)

    const [logoutModalState, setLogoutModalState] = useState(false)
    // const myRef = useRef(null)

    const openProfileMenu = () => {
        setLogoutModalState(prevState => !prevState)
    }

    useEffect(()=> {
        if(!user) {
            navigate('/login');
        }
     
    },[user])

    const logOutUser = async() => {
        dispatch(logout())
        localStorage.removeItem('blog-dev-user')
    }

    return (
        <nav className={`sticky top-0 h-screen z-10 
                        flex flex-col
                        bg-white text-black
                         dark:bg-gray-900 dark:text-white shadow-lg
                         w-16 md:w-24
                        `}>
            <div className='basis-11/12'>

                {/*Navigation Links*/}
                <ul className='flex flex-col text-white overflow-visible custombp:overflow-y-auto '>
                    <SideBarLinks to={'/'} icon={<AiFillHome size="28"/>} text={"Home"}/>

                    {
                        user?.role == "User" 
                        ? null
                        : 
                        <>
                            <SideBarLinks to={'/dashboard'} icon={<MdOutlineCreate size="28"/>} text={"Create"}/>
                            <SideBarLinks to={'/userPosts'} icon={<MdOutlineDashboardCustomize size="28"/>} text={"Posts"}/>
                        </>
                    }

                </ul>
            </div>
            {   
                user ?
                <div onClick={openProfileMenu}  className={`profile-func sidebar-links-profile mb-6`}>
                    <div className='profile-func w-12 h-12'>
                        <img className='profile-func object-cover rounded-full h-full w-full' 
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt="user profile image" />
                    </div>
                    <span className={`profile-func text-2xl mx-2 hidden`}>
                        {user.username}
                    </span>

                </div> :
                <NavLink to={'/login'} >
                    <div className={`sidebar-links group mb-6`}>
                        <MdLogin size="28"/>
                        <span className={`text-2xl mx-2 hidden`}>
                            Login
                        </span>
                    </div>  
                </NavLink>
            }
            <div onClick={() => setLogoutModalState(false)} className={`w-screen h-screen absolute ${logoutModalState ? 'block' : 'hidden'} `}>
                {
                    user ?
                    <div id='modal-logout'  
                            className={`absolute bottom-14 border-2 w-48 bg-slate-300 text-center
                            text-black dark:bg-primary-500 dark:text-white
                            `}>
                        <p className='w-full'>Logged in as <span className='text-secondary-500'>{user.name}</span></p>
                        <button className='btn-solid-no-animation ' onClick={()=> logOutUser()}>Log Out</button>
                    </div> : null
                }
            </div>
        </nav>
    )
}

const SideBarLinks = ({ to, icon, text}) => (
        <NavLink to={to} >
            <li className={`sidebar-links group`}>
                {icon}
                <span className="sidebar-tooltip group-hover:scale-100">
                    {text}
                </span>
            </li>  
        </NavLink>
  );
  

export default SideBarNav