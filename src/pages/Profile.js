import React from 'react'
import { useSelector } from 'react-redux'
import LayoutSide from '../components/LayoutSide'

const Profile = () => {

  const {user, loading, error} = useSelector(state => state.auth)

  return (
    <LayoutSide>
      {
        user &&
        <div className='flex flex-col justify-start lg:mt-12 pt-10 items-center w-full lg:h-96 lg:w-2/6 mx-auto bg-slate-300 dark:bg-gray-700 rounded-md shadow-md space-y-2 text-lg font-bold dark:text-white'>
            <div  className='w-40 h-40 rounded-full border-2 border-violet-500 bg-cover mb-6'
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)` }}
            >
            </div>
          <h2>Username: {user.username}</h2>
          <h3>Full Name: {user.firstName} {user.lastName}</h3>
          <p>Role: {user.role}</p>
      </div>
      }
    </LayoutSide>
  )
}

export default Profile