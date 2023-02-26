import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout>
        <div className='w-full flex-col dark:text-white lg:flex-row h-full flex lg:w-3/6 mx-auto justify-center items-center p-4 space-y-2 lg:pt-36'>
          <div className='space-y-4'>
          <h2 className='text-3xl font-bold'>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec nunc mi. Quisque varius diam neque, rhoncus molestie felis bibendum aliquam. Nulla sed sapien semper, imperdiet nunc euismod, tempus justo. Pellentesque feugiat suscipit lobortis. Mauris nec nunc ac elit efficitur sagittis vitae suscipit dolor. Nam molestie est at posuere vehicula. Ut tortor odio, facilisis ac sollicitudin vitae, lacinia sed nibh. </p>
          </div>
          <div className='rounded-full object-cover border-violet-500 border-4'>
            <img src="/8401.jpg" alt="image" className='rounded-full'/>
          </div>
         
        </div>
       
    </Layout>

  )
}

export default About