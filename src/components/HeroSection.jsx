import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import { ColorRing } from "react-loader-spinner";

const HeroSection = () => {
  useEffect(() => {
    getPosts();
  }, []);

  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/api/Post`;
    let result = await axios({
      method: "get",
      url: API_URL + "/getTopRated",
    });
    setPosts([...result.data]);
    console.log(result.data);
  };

  return (
    <div className="flex flex-col lg:flex-row my-4 w-full bg-white dark:bg-gray-400 md:w-4/6 lg:w-4/6">
      {posts ? (
        <>
          {/* 1rst */}
          {posts[0] ? (
            <div
              key={posts[0].id}
              style={{ backgroundImage: `url(${posts[0].imageUrl})` }}
              className={"relative w-full lg:w-1/2 border-2 bg-cover"}
            >
              <div className="w-full h-72 lg:h-128 lg:hidden">
                <img className="object-cover" src={posts[0].imageUrl} />
              </div>
              <div className="absolute space-y-1 bottom-0 z-30 text-cyan-100 px-6 py-4 bg-slate-700 w-full bg-opacity-50">
                <div className="flex w-full justify-between">
                  <div>
                    <h2 className="">{posts[0].title}</h2>
                    <p>{posts[0].description}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    {posts[0].rating == 0 ? (
                      <AiOutlineStar
                        size={20}
                        className={"text-gray-400-300"}
                      />
                    ) : (
                      <>
                        <span>{posts[0].rating}</span>
                        <AiFillStar size={20} className={"text-yellow-300"} />
                      </>
                    )}
                  </div>
                </div>

                <div className="flex  items-center justify-between">
                  <div className="flex flex-row justify-start space-x-4 ">
                    {posts[0].tags.map((tag) => {
                      let tagDesign = "";

                      switch (tag.id) {
                        case 1:
                          tagDesign = "text-green-500";
                          break;
                        case 2:
                          tagDesign = "text-red-500";
                          break;
                        case 3:
                          tagDesign = "text-violet-500";
                          break;
                        case 4:
                          tagDesign = "text-yellow-500";
                          break;
                        default:
                          tagDesign = "text-orange-500";
                          break;
                      }

                      return (
                        <span key={tag.id} className={`${tagDesign} font-bold`}>
                          {tag.value}
                        </span>
                      );
                    })}
                  </div>
                  <NavLink to={`/post/${posts[0].id}`}>Read more</NavLink>
                </div>
              </div>
            </div>
          ) : null}
          <div className="lg:flex lg:w-1/2  lg:flex-col">
            <div className="lg:flex lg:flex-row border-2">
              {/* 3th */}
              {posts[2] ? (
                <div key={posts[2].id} className={"relative w-full lg:w-1/2"}>
                  <div className="w-full h-72 overflow-hidden">
                    <img className="object-cover" src={posts[2].imageUrl} />
                  </div>
                  <div className="absolute space-y-1 bottom-0 z-30 text-cyan-100 px-6 py-4 bg-slate-700 w-full bg-opacity-50">
                    <div className="flex w-full justify-between">
                      <div>
                        <h2 className="">{posts[2].title}</h2>
                        <p>{posts[2].description}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        {posts[2].rating == 0 ? (
                          <AiOutlineStar
                            size={20}
                            className={"text-gray-400-300"}
                          />
                        ) : (
                          <>
                            <span>{posts[0].rating}</span>
                            <AiFillStar
                              size={20}
                              className={"text-yellow-300"}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex  items-center justify-between">
                      <div className="flex flex-row justify-start space-x-4 ">
                        {posts[2].tags.map((tag) => {
                          let tagDesign = "";

                          switch (tag.id) {
                            case 1:
                              tagDesign = "text-green-500";
                              break;
                            case 2:
                              tagDesign = "text-red-500";
                              break;
                            case 3:
                              tagDesign = "text-violet-500";
                              break;
                            case 4:
                              tagDesign = "text-yellow-500";
                              break;
                            default:
                              tagDesign = "text-orange-500";
                              break;
                          }

                          return (
                            <span
                              key={tag.id}
                              className={`${tagDesign} font-bold`}
                            >
                              {tag.value}
                            </span>
                          );
                        })}
                      </div>
                      <NavLink to={`/post/${posts[2].id}`}>Read more</NavLink>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* 4th */}
              {posts[3] ? (
                <div key={posts[3].id} className={"relative w-full  lg:w-1/2"}>
                  <div className="w-full h-72 overflow-hidden">
                    <img className="object-cover" src={posts[3].imageUrl} />
                  </div>
                  <div className="absolute space-y-1 bottom-0 z-30 text-cyan-100 px-6 py-4 bg-slate-700 w-full bg-opacity-50">
                    <div className="flex w-full justify-between">
                      <div>
                        <h2 className="">{posts[3].title}</h2>
                        <p>{posts[3].description}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        {posts[3].rating == 0 ? (
                          <AiOutlineStar
                            size={20}
                            className={"text-gray-400-300"}
                          />
                        ) : (
                          <>
                            <span>{posts[3].rating}</span>
                            <AiFillStar
                              size={20}
                              className={"text-yellow-300"}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex  items-center justify-between">
                      <div className="flex flex-row justify-start space-x-4 ">
                        {posts[3].tags.map((tag) => {
                          let tagDesign = "";

                          switch (tag.id) {
                            case 1:
                              tagDesign = "text-green-500";
                              break;
                            case 2:
                              tagDesign = "text-red-500";
                              break;
                            case 3:
                              tagDesign = "text-violet-500";
                              break;
                            case 4:
                              tagDesign = "text-yellow-500";
                              break;
                            default:
                              tagDesign = "text-orange-500";
                              break;
                          }

                          return (
                            <span
                              key={tag.id}
                              className={`${tagDesign} font-bold`}
                            >
                              {tag.value}
                            </span>
                          );
                        })}
                      </div>
                      <NavLink to={`/post/${posts[3].id}`}>Read more</NavLink>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {/* 2nd */}
            {posts[1] ? (
              <div
                key={posts[1].id}
                className={"relative w-full  lg:w-full  border-2"}
              >
                <div className="w-full h-72 lg:h-88   overflow-hidden">
                  <img className="object-cover" src={posts[1].imageUrl} />
                </div>
                <div className="absolute space-y-1 bottom-0 z-30 text-cyan-100 px-6 py-4 bg-slate-700 w-full bg-opacity-50">
                  <div className="flex w-full justify-between">
                    <div>
                      <h2 className="">{posts[1].title}</h2>
                      <p>{posts[1].description}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      {posts[1].rating == 0 ? (
                        <AiOutlineStar
                          size={20}
                          className={"text-gray-400-300"}
                        />
                      ) : (
                        <>
                          <span>{posts[1].rating}</span>
                          <AiFillStar size={20} className={"text-yellow-300"} />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex  items-center justify-between">
                    <div className="flex flex-row justify-start space-x-4 ">
                      {posts[1].tags.map((tag) => {
                        let tagDesign = "";

                        switch (tag.id) {
                          case 1:
                            tagDesign = "text-green-500";
                            break;
                          case 2:
                            tagDesign = "text-red-500";
                            break;
                          case 3:
                            tagDesign = "text-violet-500";
                            break;
                          case 4:
                            tagDesign = "text-yellow-500";
                            break;
                          default:
                            tagDesign = "text-orange-500";
                            break;
                        }

                        return (
                          <span
                            key={tag.id}
                            className={`${tagDesign} font-bold`}
                          >
                            {tag.value}
                          </span>
                        );
                      })}
                    </div>
                    <NavLink to={`/post/${posts[1].id}`}>Read more</NavLink>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="flex w-full items-center justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
    </div>
  );
};

export default HeroSection;

// return (

//     <div className='flex flex-col lg:flex-row w-full bg-white dark:bg-gray-400 md:w-4/6 lg:w-4/6'>
//     {
//     posts &&
//     <>
//      {/* 1rst */}
//         <MainPost post={posts[0]}/>
//         <div  className='lg:flex lg:w-1/2  lg:flex-col'>
//             <div className='lg:flex lg:flex-row border-2'>
//                 {/* 3th */}
//                 <LastPost post={posts[2]}/>
//                 {/* 4th */}
//                 <LastPost post={posts[3]}/>
//             </div>
//             {/* 2nd */}
//                 <SecondatyPost post={posts[1]} />
//         </div>
//     </>
//     }
//     </div>
//   )
// }
