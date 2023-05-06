import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SmallPost from "./SmallPost";
import axios from "axios";
import { useSelector } from "react-redux";
import { tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 1em 2em;
  flex-wrap: wrap;
  gap: 1.5em;
  ${tablet({ flexWrap: "none" })}
`;

const Allblogs = () => {
  const [post, setPost] = useState("");

  const { searchPost } = useSelector((state) => state.users);

  useEffect(() => {
    let isSubscribed = true;

    const getPosts = async () => {
      try {
        const res = await axios.get("/api/post/getallpost");

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
      {searchPost?.length > 0
        ? searchPost?.map((p, i) => <SmallPost {...p} />)
        : post?.length > 0 && post?.map((p, i) => <SmallPost {...p} />)}
    </Container>
  );
};

export default Allblogs;
