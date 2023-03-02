import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TimeAgo from "react-timeago";
import Layout from "../components/Layout";

import { ColorRing } from "react-loader-spinner";

import { AiFillStar, AiOutlineStar, AiFillLock } from "react-icons/ai";

const Post = () => {
  const starArr = [1, 2, 3, 4, 5];
  const { user, loading, error } = useSelector((state) => state.auth);

  let { id } = useParams();

  const [userComment, setUserComment] = useState("");
  const [anonyMode, setAnonyMode] = useState(false);

  const [starRating, setStarRating] = useState(0);

  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id);
  }, [id, user]);

  useEffect(() => {
    if (post && post.userStar) {
      setStarRating(post.userStar.value);
    }
  }, [post]);

  const getPost = async (postId) => {
    const API_URL = `${process.env.REACT_APP_API_URL}/api/post`;
    try {
      let result = await axios({
        method: "get",
        url: API_URL + `/${postId}?userId=${user ? user.id : 0}`,
      });

      let postData = result.data;
      postData.comments = postData.comments.reverse();

      setPost(postData);
      console.log(result.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const postComment = async () => {
    const commentDataDto = {
      body: userComment,
      anonymous: anonyMode,
      userId: user.id,
      postId: post.id,
    };

    const API_URL = `${process.env.REACT_APP_API_URL}/api/comment`;
    let result = await axios({
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      method: "post",
      url: API_URL + "/create",
      data: commentDataDto,
    });

    let newPost = { ...post };

    newPost.comments = [result.data, ...newPost.comments];

    setPost(newPost);
    console.log(result.data);
  };

  const setStarFunc = (index) => {
    setStarRating(index);
    console.log(index);
  };

  const ratePost = async () => {
    if (post.userStar) {
      const updateStarDto = {
        ...post.userStar,
        value: starRating,
      };

      const API_URL = `${process.env.REACT_APP_API_URL}/api/star`;
      let result = await axios({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "put",
        url: API_URL + "/update",
        data: updateStarDto,
      });
    } else {
      const createStarDto = {
        value: starRating,
        userId: user.id,
        postId: post.id,
      };
      const API_URL = `${process.env.REACT_APP_API_URL}/api/star`;
      let result = await axios({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "post",
        url: API_URL + "/create",
        data: createStarDto,
      });
    }
  };

  return (
    <Layout>
      {!post ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        <div className="w-full lg:w-4/6 flex flex-col justify-center items-center">
          <div
            style={{ backgroundImage: `url(${post.imageUrl})` }}
            className={"relative w-full h-80 bg-cover"}
          >
            <div className="absolute bottom-0 w-full p-2 flex flex-row justify-center space-x-4 bg-gray-900 bg-opacity-70">
              {post.tags.map((tag) => {
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
          </div>
          <div className="w-full flex flex-col justify-start items-center p-4 mb-10 border-b-2 border-gray-300 dark:text-white">
            <h1 className="text-4xl font-bold mb-10">{post.title}</h1>
            <p className="text-lg ">{post.body}</p>
          </div>
          <div
            className="w-28 h-28 rounded-full border-2 border-violet-500 bg-cover"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
            }}
          ></div>
          <h2 className="text-xl font-bold dark:text-white">
            {post.user.username}
          </h2>
          <TimeAgo className="dark:text-white pb-8" date={post.createdAt} />
          {/* star area */}
          {user && (
            <div className="w-full flex flex-col justify-center items-start bg-gray-300 px-6 py-2 space-y-2">
              <div className="flex items-center">
                {starArr.map((star, index) => {
                  if (star <= starRating) {
                    return (
                      <AiFillStar
                        className="text-yellow-400 cursor-pointer"
                        id={star}
                        key={index}
                        size={32}
                        onClick={() => setStarFunc(star)}
                      />
                    );
                  }
                  return (
                    <AiOutlineStar
                      className="cursor-pointer"
                      id={star}
                      key={index}
                      size={32}
                      onClick={() => setStarFunc(star)}
                    />
                  );
                })}

                <div className="mx-4">
                  <button onClick={ratePost} className="btn-solid-no-animation">
                    Rate
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* comments area */}
          <div className="w-full flex flex-col justify-center items-start bg-gray-300 px-6 py-2 space-y-2">
            {user ? (
              <>
                <h3 className="text-lg font-bold">Leave a comment</h3>
                <textarea
                  onChange={(e) => setUserComment(e.target.value)}
                  value={userComment}
                  className="w-full h-32 bg-slate-200"
                  placeholder="Share your thoughts..."
                ></textarea>
                <div className="flex flex-row items-center space-x-2">
                  <div>
                    <button
                      onClick={postComment}
                      disabled={false}
                      className="btn-solid-no-animation"
                    >
                      Comment
                    </button>
                  </div>

                  <span className="font-bold text-base">Anonymous mode</span>
                  <input
                    onChange={() => setAnonyMode((prevState) => !prevState)}
                    type={"checkbox"}
                  ></input>
                </div>
              </>
            ) : (
              <div className="w-full h-44 flex flex-col justify-center items-center space-y-2">
                <AiFillLock size={60} className="text-gray-700" />
                <h2 className="text-lg">
                  You need to be logged in to comment and rate
                </h2>
                <button className="btn bg-gray-700">
                  <NavLink to={"/login"}> Log In</NavLink>
                </button>
              </div>
            )}
          </div>
          <div className="w-full space-y-2 bg-gray-300">
            {post.comments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="w-full  bg-slate-200 p-2 space-y-2"
                >
                  <div className="flex space-x-1">
                    <h3 className="text-lg text-violet-500">
                      {comment.anonymous
                        ? "Anonymous"
                        : comment.userInfo.username}
                    </h3>
                    <span>posted</span>
                    <TimeAgo date={comment.createdAt} />
                  </div>
                  <p className="text-lg shadow-md">{comment.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Post;
