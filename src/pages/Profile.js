import {useEffect, } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { logout, reset} from '../features/auth/authSlice'

const Profile = () => {
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector(
        (state) => state.auth
      )

    const logOut = () => {
        dispatch(logout())
        localStorage.removeItem('blog-dev-user')
    }

  return (
    <div>
          <button onClick={logOut}>Log Out</button>
    </div>
  
  )
}

export default Profile