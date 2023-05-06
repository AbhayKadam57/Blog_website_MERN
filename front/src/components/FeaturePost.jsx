import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import axios from "axios";
import { tablet } from "../responsive";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 400px);
  grid-gap: 1em;
  padding: 2em;
  ${tablet({ display: "flex", flexDirection: "column" })}
`;

const FeaturePost = () => {
  const [post, setPost] = useState("");

  const NewPosts = post?.slice(0, 3);

  useEffect(() => {
    let isSubscribed = true;

    const getPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.BACKEND_URL}/api/post/getallpost`
        );

        setPost(res.data.posts);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribed) {
      getPosts();
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Container>
      {post?.length > 0 &&
        NewPosts?.map((p, i) => (
          <Post
            type={i === 0 ? "first" : i === 1 ? "second" : "third"}
            {...p}
          />
        ))}
    </Container>
  );
};

export default FeaturePost;
