import axios from "axios";
import {
  LoginFailed,
  LoginStarted,
  LoginSuccessFull,
  RegisterFailed,
  RegisterStarted,
  RegisterSuccessFull,
  searchingPost,
} from "./redux/userSlice";
import axiosInstance from "../axiosInstance";

export const LoginUser = async (dispatch, user) => {
  dispatch(LoginStarted());

  try {
    const res = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user/login`,
      user
    );

    dispatch(LoginSuccessFull(res.data));

    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (e) {
    console.log(e);

    if (e.response.data.error) {
      const error = e.response.data.error?.map((e) => {
        return `${e.msg}`;
      });

      dispatch(LoginFailed(`${error}`));
    } else {
      const error = e.response.data;

      dispatch(LoginFailed(`${error}`));
    }

    dispatch(LoginFailed(`${error}`));
  }
};

export const RegisterUser = async (dispatch, user) => {
  dispatch(RegisterStarted());

  try {
    const res = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user/register`,
      user
    );

    dispatch(RegisterSuccessFull(res.data));
  } catch (e) {
    if (e.response.data.error) {
      const error = e.response.data.error?.map((e) => {
        return `${e.msg}`;
      });

      dispatch(RegisterFailed(`${error}`));
    } else {
      const error = e.response.data;

      dispatch(RegisterFailed(`${error}`));
    }

    dispatch(RegisterFailed(`${error}`));
  }
};

export const SearchPost = async (dispatch, SeacrhTerm) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_REACT_BACKEND_URL}/api/post/searchpost/${
        user?._id
      }?text=${SeacrhTerm}`,
      { headers: { token: `Bearer ${user.accessToken}` } }
    );

    dispatch(searchingPost(res.data));
  } catch (e) {
    const error = e.response.data.error.map((e) => {
      return `${e.msg}`;
    });

    dispatch(LoginFailed(`${error}`));
  }
};
