import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LayoutSide from "../components/LayoutSide";

import { MdEdit, MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const UserPosts = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const API_URL = `${process.env.REACT_APP_API_URL}/api/post`;
    let result = await axios({
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      method: "get",
      url: API_URL + `/userPosts/${user.id}`,
    });
    setPosts(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (index) => {
    //toast.warning("Not Implemented");
    try {
      const API_URL = `${process.env.REACT_APP_API_URL}/api/post`;
      let result = await axios({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "delete",
        url: API_URL + `/delete/${index}`,
      });
      toast.success(result.data);
      getPosts();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <LayoutSide>
      <div className="w-full lg:w-3/6 p-6 mx-auto space-y-2">
        {posts &&
          posts.map((post, index) => {
            return (
              <div
                key={index}
                className="flex h-24 justify-between items-center shadow-md p-2 dark:bg-gray-500 dark:text-white"
              >
                <h2>{post.title}</h2>
                <div className="flex">
                  <NavLink to={`/editPost/${post.id}`}>
                    <MdEdit className="hover:text-yellow-500" size="30" />
                  </NavLink>

                  <MdDelete
                    className="cursor-pointer hover:text-red-500"
                    size="30"
                    onClick={() => deletePost(post.id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </LayoutSide>
  );
};

export default UserPosts;
