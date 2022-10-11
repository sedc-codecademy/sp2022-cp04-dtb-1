import React, {useState} from 'react'

import { GiHamburgerMenu,} from 'react-icons/gi'
import { AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

import { FaMoon, FaSun } from 'react-icons/fa';

import useDarkMode from '../hooks/useDarkMode';
import { useSelector } from 'react-redux';

const Header = () => {

    const {user, loading, error} = useSelector(state => state.auth)

    const [hamburger, setHamburger] = useState(false)
    const [searchBar, setSearchBar] = useState(false)

    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    const mobileHamburger = () => {
        setHamburger(prevState => !prevState)
        setSearchBar(false)
    }

    const searchBarState = () => {
        setSearchBar(prevState => !prevState)
        setHamburger(false)
    }

  return (
    <>
 
   
    <nav className='relative z-30 h-20 flex flex-row justify-around items-center bg-slate-50 shadow-md cursor-pointer'>
        <GiHamburgerMenu size="30" onClick={mobileHamburger} 
                    className={`block lg:hidden
                        ${hamburger ? 'text-violet-600 hover:text-black' : 'text-black hover:text-violet-600'}
                    `} />
        <div className='logo text-3xl text text-violet-600 font-semibold'>
            <h2>DevBlog</h2>
        </div>
   
        <ul className={` bg-slate-50
                        ${hamburger 
                            ? "absolute w-full top-full flex flex-col justify-center items-start space-y-3  pt-4" 
                            : "hidden"} lg:relative lg:w-auto lg:flex lg:flex-row lg:top-0 lg:justify-between lg:items-center lg:space-x-5 lg:space-y-0 lg:pt-0
        `}>
                <HeaderLinks mobileHamburger={mobileHamburger} text={"Home"} path={"/"}/>
                <HeaderLinks mobileHamburger={mobileHamburger} text={"Newsletter"} path={"/newsletter"}/>
                <HeaderLinks mobileHamburger={mobileHamburger} text={"About"} path={"/about"}/>
                {
                    user
                    ? <HeaderLinks mobileHamburger={mobileHamburger} text={user.username} path={`profile`}/>
                    : <HeaderLinks mobileHamburger={mobileHamburger} text={"LogIn"} path={"/login"}/>
                }
                
        </ul>
        
        <div className='relative flex justify-center items-center group' onClick={searchBarState}>
           {!searchBar
            ?  <>
                    <AiOutlineSearch size="30"></AiOutlineSearch>
                    <span className='tooltip'>Search</span>
                </>
            
            :  <>
                    <AiOutlineClose size="30"></AiOutlineClose>
                    <span className='tooltip'>Close</span>
                </>
           }
            
           {/* LogIn original idea */}
        </div>
        <div className={`
                    ${searchBar ? 'absolute w-full top-full flex flex-row justify-between items-center h-12 group' : 'hidden'}
        `}>
            <input
                className='w-full h-full px-2 peer outline-0'
                id="search"
                placeholder='Search...'
            />
            <button className='bg-slate-50 h-full hover:bg-slate-200 p-2 peer-focus:border-'>
                Search
            </button>
        </div>

        <span onClick={handleMode} className="absolute right-2 lg:right-8">
                {darkTheme ? (
                <FaSun size='26' className='dark-theme-icon' />
                ) : (
                <FaMoon size='26' className='dark-theme-icon' />
                )}
        </span>
    </nav>
    {
        hamburger &&
        <div onClick={mobileHamburger} className='absolute w-screen h-screen z-20 lg:hidden'></div>
    }
    
    </>
  )
}

const HeaderLinks = ({text, path, mobileHamburger}) => (
    <li className='text-xl shadow-md lg:shadow-none w-full px-8 py-2'
        onClick={mobileHamburger}    
    >
        <NavLink end to={path} className={({ isActive }) =>
              isActive ? 'text-violet-600 ' : null
            }>           
                {text}
        </NavLink>
    </li>
);

export default Header