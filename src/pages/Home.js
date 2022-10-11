import {useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

const Home = () => {
  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const API_URL = 'http://localhost:5139/api/post'
    let result = await axios({
        method: 'get',
        url: API_URL + '/getAllPosts',
      });

      console.log(result.data)
  }

  return (
    <Layout>
        <div>Home</div>
    </Layout>
  
  )
}

export default Home