import React from 'react'
import { AiFillStar,AiOutlineStar} from 'react-icons/ai'

const LastPost = ({post}) => {
  return (
    <div key={post.id} className={'relative w-full lg:w-1/2'}>
        <div className='w-full h-72 overflow-hidden'>
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
                
            <div className='flex flex-row justify-start space-x-4 '>
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
        </div>       
    </div>
  )
}

export default LastPost