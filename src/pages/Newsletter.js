import React from "react";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

const Newsletter = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailAddress: "",
  });

  const { emailAddress } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    subscribeToNewsletter();
  };

  const subscribeToNewsletter = async () => {
    const emailDataDto = { emailAddress };
    const API_URL = `${process.env.REACT_APP_API_URL}/api/email`;
    try {
      let result = await axios({
        method: "post",
        url: API_URL + `/subscribe`,
        data: { ...emailDataDto },
      });
      toast.success("Subscribed to Newsletter");
    } catch (error) {
      //console.log(error.response.data)
      if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="form-class">
        <h2 className="form-title">Subscribe to Newsletter</h2>
        <div className="w-full">
          <input
            className="user-inputs"
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={emailAddress}
            placeholder="email..."
            onChange={onChange}
          ></input>
        </div>
        <button disabled={!emailAddress} className="btn">
          Subscribe
        </button>
        <p className="mt-4">
          Want to unsubscribe?{" "}
          <span className="text-violet-500 dark:text-violet-300">
            <NavLink to="/unsubscribe"> Unsubscribe</NavLink>
          </span>
        </p>
      </form>
    </Layout>
  );
};

export default Newsletter;
