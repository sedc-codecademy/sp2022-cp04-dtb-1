import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout'
import {NavLink} from 'react-router-dom';

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import {login, reset} from '../features/auth/authSlice'


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      })

    const { username, password } = formData

    const { user, loading, error } = useSelector(
        (state) => state.auth
      )
    
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      } 

    const onSubmit = async (e) => {
        e.preventDefault()

        dispatch(login(formData))
                 
    }
    useEffect(() => {
      if(loading == "succeeded" ) {
        toast.success(`Welcome ${user.username}`)
        navigate('/');
      }

      if(loading == "failed" ) {
        toast.error(error)
      }
      dispatch(reset());

    }, [user, loading, error])

  return (
    <Layout>
             <form onSubmit={onSubmit}  
                className="form-class">   
                <h2 className='form-title'>Login</h2>
                <div className='w-full'>
                    <input  className='user-inputs'
                        type="text" 
                        id='username'
                        name='username'
                        value={username}
                        placeholder="username..."
                        onChange={onChange}>
                    </input>    
                </div>
                <div className='w-full'>
                    <input className='user-inputs'
                        type="password"
                        id='password'
                        name='password'
                        value={password}
                        placeholder="password..."
                        onChange={onChange}>    
                    </input>
                </div>
                <button disabled={!username || !password} className='btn'>Login</button>
                <p className='mt-4'>Dont have an account? <span className='text-violet-500 dark:text-violet-300'><NavLink to='/register'> Register</NavLink></span></p>
            </form>
    </Layout>

  )
}

export default Login