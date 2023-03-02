import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LayoutSide from "../components/LayoutSide";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  ListItemText,
  Checkbox,
  Select,
} from "@mui/material";
import { Navigate } from "react-router-dom";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    getPost(id);
  }, [id]);

  const [preview, setPreview] = useState();

  const [postForm, setPostForm] = useState({
    title: "",
    description: "",
    body: "",
    imageUrl: "",
  });

  const onChange = (e) => {
    setPostForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getPost = async (postId) => {
    const API_URL = `${process.env.REACT_APP_API_URL}/api/post`;
    try {
      let result = await axios({
        method: "get",
        url: API_URL + `/${postId}?userId=${user ? user.id : 0}`,
      });

      const postForm = {
        title: result.data.title,
        description: result.data.description,
        body: result.data.body,
        imageUrl: result.data.imageUrl,
      };

      setPostForm(postForm);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (postForm.imageUrl) {
      setPreview(
        <img
          src={postForm.imageUrl}
          className="post-background-image-img"
          alt={"cover"}
        ></img>
      );
    } else {
      setPreview(null);
    }
  }, [postForm.imageUrl]);

  const sendNewsletter = async (postDto) => {
    const postTitle = postDto.Title;

    const API_URL = `${process.env.REACT_APP_API_URL}/api/email`;
    try {
      let result = await axios({
        method: "post",
        url:
          API_URL +
          `/newsletter?postTitle=${postDto.title}&postId=${postDto.id}`,
      });
      toast.success("Newsletter Sent");
    } catch (error) {
      toast.error("Error Sending Emails");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const API_URL = `${process.env.REACT_APP_API_URL}/api/post`;
    try {
      let result = await axios({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "put",
        url: API_URL + "/update",
        data: { ...postForm, id, userId: user.id },
      });

      if (result) {
        {
          toast.success("Post updated");
          navigate(`/post/${result.data.id}`);
          sendNewsletter(result.data);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <LayoutSide>
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="flex justify-center items-center  bg-slate-200 dark:bg-primary-800">
          <form onSubmit={onSubmit} className="bg-slate-200 dark:bg-gray-600">
            <div className="post-card-create group">
              <div className="post-image-data-create">
                <div className="post-background-image group-hover:scale-150">
                  {preview}
                </div>
                <div className="publication-details"></div>
              </div>
              <div className="bg-white dark:bg-gray-600 flex items-center justify-start p-2">
                <input
                  type="url"
                  name="imageUrl"
                  onChange={onChange}
                  value={postForm.imageUrl}
                  placeholder={"image url..."}
                  className="bg-slate-100 dark:bg-slate-500 shadow-md w-full"
                ></input>
              </div>

              <div className="post-data-create space-y-3">
                <h1 className="post-title">
                  <input
                    type="text"
                    name="title"
                    className="bg-slate-100 dark:bg-slate-500 shadow-md w-full"
                    value={postForm.title}
                    onChange={onChange}
                    placeholder="Title"
                  ></input>
                </h1>
                <div className="post-description-create">
                  <textarea
                    name="description"
                    className="w-full h-full resize-none bg-slate-100 dark:bg-slate-500 shadow-md"
                    maxLength="200"
                    value={postForm.description}
                    onChange={onChange}
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="post-description-create">
                  <textarea
                    name="body"
                    className="w-full h-full resize-none bg-slate-100 dark:bg-slate-500 shadow-md"
                    maxLength="100"
                    value={postForm.body}
                    onChange={onChange}
                    placeholder="Body"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-slate-200 dark:bg-gray-600 flex items-center justify-center p-2 pb-5">
              <button type="submit" className="btn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutSide>
  );
};

export default EditPost;
