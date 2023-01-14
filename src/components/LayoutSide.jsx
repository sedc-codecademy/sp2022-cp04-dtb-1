import React from 'react'
import SideBarNav from './SideBar'

const LayoutSide = ({children}) => {
    return (
      <div className='flex flex-row
       w-full min-h-screen bg-slate-200 dark:bg-gray-800 '>
        <SideBarNav></SideBarNav>
          {children}
      </div>
    )
  }
  
export default LayoutSide