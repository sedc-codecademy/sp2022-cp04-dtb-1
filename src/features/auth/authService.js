import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/user`;

//Register user
const register = async (userData) => {
  let response = await axios({
    method: "post",
    url: API_URL + "/register",
    data: { ...userData },
  });

  if (response.data) {
    localStorage.setItem("blog-dev-user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  console.log(userData);
  let response = await axios({
    method: "post",
    url: API_URL + "/login",
    data: { ...userData },
  });

  if (response.data) {
    localStorage.setItem("blog-dev-user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
