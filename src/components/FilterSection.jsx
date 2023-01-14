import React, { useEffect, useState } from 'react'
import {MenuItem, InputLabel, FormControl, Select} from '@mui/material';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

import { AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { ColorRing } from 'react-loader-spinner'

const FilterSection = () => {

    const [formData, setFormData] = useState({
        date: '',
        tag: '',
      })

    const { tag,date } = formData

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1)

    const [morePosts, setMorePosts] = useState(true)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        console.log(formData)
        setMorePosts(true)
        setPage(1)
    }
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTags()
      },[])
  
    const getTags = async () => {
        const API_URL = 'http://localhost:5139/api/tag'
        let result = await axios({
            method: 'get',
            url: API_URL + '/getAllTags',
            });
            setTags(result.data)
    }


    
    useEffect(()=> {
        if(page == 1) {
            setPosts([])
            chagePage()
        }
        getPosts()
    }, [page])

    const chagePage = async () => setPage(prevState => prevState + 1)
    
    const getPosts = async () => {
            const API_URL = 'http://localhost:5139/api/post'
            const result =  await axios({
                method: 'get',
                url: API_URL + `/getAllPosts?page=${page}&limit=${5}&tagId=${tag ? tag : 0}&dateTime=${date ? date : "All"}`,
                });
            if(result.data.length == 0) {
                setMorePosts(false)
                return
            }
            setPosts(prevState => [...prevState, ...result.data])
        }

  return (
    <div className='w-full bg-white dark:bg-gray-400 md:w-4/6 lg:w-4/6 '>
        <form className={"lg:px-48 bg-slate-100 dark:bg-gray-700 w-full flex flex-row justify-between items-center px-6"}>

                <input 
                    type={'date'} 
                    name="date"
                    value={date}
                    onChange={onChange}
                    className={'dark:bg-slate-500 dark:text-white'}
                    >
                </input>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label" className={'dark:text-white'}>Tags</InputLabel>
                    <Select
                    className={'dark:text-white dark:bg-slate-500'}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={tag}
                    name="tag"
                    onChange={onChange}
                    autoWidth
                    label="Tags"
                    >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {
                        tags && tags.map(tag => {
                            return (
                                <MenuItem value={tag.id} key={tag.id}>{tag.value}</MenuItem>
                            )
                        })
                    }
                    </Select>
                </FormControl>
           
        </form>
        <div className='flex flex-row flex-wrap justify-around'>
        {
            posts.length != 0 ? posts.map(post => {
                return (
                    <div key={post.id} className={'relative w-full  lg:w-3/5 m-2'}>
                        <div className='w-full h-56 lg:h-96 overflow-hidden'>
                            <img className='object-cover' src={post.imageUrl} />
                        </div>
                        <div className='absolute space-y-1 bottom-0 z-30 text-cyan-100 px-6 py-4 bg-slate-700 w-full bg-opacity-50'>
                            <div className='flex w-full justify-between'>
                                <div>
                                    <h2 className=''>{post.title}</h2>
                                    <p>{post.description}</p>
                                </div>
                                <div className='flex items-center justify-center'>
                                    {
                                        post.rating == 0 
                                        ? <AiOutlineStar size={20} className={'text-gray-400-300'} />
                                        :<>
                                            <span>{post.rating}</span>
                                            <AiFillStar size={20} className={'text-yellow-300'} />
                                        </> 
                                    }
                                    
                                </div>
                                
                            </div>
                    
                            <div className='flex justify-between'>
                                <div className='flex flex-row space-x-4'>
                                {
                                    post.tags.map(tag => {
                                        let tagDesign = ''

                                        switch(tag.id) {
                                            case 1:
                                                tagDesign= 'text-green-500'
                                                break;
                                            case 2:
                                                tagDesign= 'text-red-500'
                                                break;
                                            case 3:
                                                tagDesign= 'text-violet-500'
                                                break;
                                            case 4:
                                                tagDesign= 'text-yellow-500'
                                                break;
                                            default:
                                                break;
                                        }

                                        return (
                                            <span key={tag.id} className={`${tagDesign} font-bold`}>{tag.value}</span>
                                        )
                                    })
                                }
                                </div>
                                <NavLink to={`/post/${post.id}`}>Read more</NavLink>
                            </div>
                        </div>       
                    </div>
                )
            }) :
            <div className='flex items-center justify-center '>
            <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
        </div>
        }
        </div>
        <div className='w-56 mx-auto'>
            <button disabled={!morePosts} onClick={chagePage} className={'btn-solid-no-animation'}> Load More</button>
        </div>
       
    </div>
  )
}

export default FilterSection