import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
    return (
      <>
        <Header />
        <div className='flex flex-col justify-start items-center
       w-full min-h-screen bg-slate-200 dark:bg-gray-800 '>
        
          {children}
      </div>
      <Footer />
      </>
    )
  }
  
export default Layout