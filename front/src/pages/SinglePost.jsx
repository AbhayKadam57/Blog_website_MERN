import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em 2em;
  flex-direction: column;
  width: 100%;
`;

const Post = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  padding: 1em 2em;
  flex-direction: column;
  width: 80%;
  gap: 1.5em;
`;

const Image = styled.div`
  width: 100%;
  height: 35em;
`;

const Title = styled.h1``;

const SinglePost = () => {
  const [NewPost, setNewPost] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user._id;

  const accessToken = user.accessToken;

  const { pathname } = useLocation();

  const postId = pathname.split("/")[2];

  const postDate = NewPost.updatedAt;

  const Day = new Date(postDate).getDate();

  const Month = new Date(postDate).getMonth();

  const Year = new Date(postDate).getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    let isSubscribed = true;

    const getPost = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.BACKEND_URL
          }/api/post/getsinglepost/${userId}/${postId}`,
          { headers: { token: `${accessToken}` } }
        );

        setNewPost({ ...res.data[0] });
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribed) {
      getPost();
    }

    return () => {
      isSubscribed = false;
    };
  }, [postId]);

  return (
    <Container>
      <Post>
        <Title>{NewPost.title}</Title>
        <p>
          {months[Month]}
          {" " + Day},{Year}
        </p>
        <p>
          By <b>{NewPost.author}</b>
        </p>

        <Image>
          <img src={`${NewPost.image}`} alt="" />
        </Image>
        <p>{NewPost.content}</p>
      </Post>
    </Container>
  );
};

export default SinglePost;
