import {useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useSelector } from 'react-redux'
import FilterSection from '../components/FilterSection'
import HeroSection from '../components/HeroSection'

const Home = () => {

  const { user, loading, error } = useSelector(
    (state) => state.auth
  )

  // useEffect(() => {
  //   getPosts()
  // }, [])

  // const getPosts = async () => {
  //   const API_URL = 'http://localhost:5139/api/post'
  //   let result = await axios({
  //       method: 'get',
  //       url: API_URL + '/getAllPosts?page=1&limit=10&tagId=0&dateTime=2022/10/10',
  //     });

  //     console.log(result.data)
  // }

  return (
    <Layout>
        <HeroSection></HeroSection>
        <FilterSection></FilterSection>
    </Layout>
  
  )
}

export default Home