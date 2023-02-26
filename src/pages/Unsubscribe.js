import React from 'react'
import Layout from '../components/Layout'

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

const Unsubscribe = () => {
 
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
        emailAddress: '',
      })
    
      const { emailAddress } = formData
  
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      } 
  
    const onSubmit = async (e) => {
        e.preventDefault()
        unsubscribeToNewsletter()
              
    }

    const unsubscribeToNewsletter = async () => {
        const emailDataDto = {emailAddress}
        const API_URL = `http://localhost:5139/api/email`
        try {
          let result = await axios({
            method: 'post',
            url: API_URL + `/unsubscribe`,
            data: {...emailDataDto}
          });
          toast.success("Unsubscribed to Newsletter")
        } catch (error) {
          //console.log(error.response.data)
          if(error.response?.data) {
            toast.error(error.response.data)
          }
          else {
            toast.error(error)
          }
          
        }
      }
  
    return (
      <Layout>
        <form onSubmit={onSubmit}  
            className="form-class">   
            <h2 className='form-title'>Unsubscribe to Newsletter</h2>
            <div className='w-full'>
                <input  className='user-inputs'
                    type="email" 
                    id='emailAddress'
                    name='emailAddress'
                    value={emailAddress}
                    placeholder="email..."
                    onChange={onChange}>
                </input>    
            </div>
            <button disabled={!emailAddress} className='btn'>Unsubscribe</button>
            <p className='mt-4'>Want the latest news?<span className='text-violet-500 dark:text-violet-300'><NavLink to='/newsletter'> Subscribe</NavLink></span></p>
        </form>
      </Layout>
    )
}

export default Unsubscribe