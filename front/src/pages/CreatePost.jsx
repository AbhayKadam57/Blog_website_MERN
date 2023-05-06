import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em 2em;
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

const Form = styled.form`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  gap: 2em;
`;

const Input = styled.input`
  width: 100%;
  padding: 1em;
  font-size: 1em;
  border-radius: 2em;
`;

const Label = styled.label`
  font-size: 1.5em;
  font-weight: 600;
`;

const InputBox = styled.div`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1em;
  font-size: 1em;
`;

const Button = styled.button`
  border-radius: 2em;
  background-color: #222;
  color: white;
  cursor: pointer;
  font-size: 1.1em;
  width: 30%;
  height: 3em;
  ${tablet({ width: "90%" })}
`;

const CreatePost = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const userId = user._id;

  const accessToken = user.accessToken;

  const { search } = useLocation();
  const users = JSON.parse(localStorage.getItem("user"));

  const postId = search.split("?")[1];

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (title && author && image && content) {
      const res = await axios.post(
        `/api/post/createpost/${userId}`,
        { userId, title, author, image, content },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage(res.data);
      setTitle("");
      setAuthor("");
      setImage("");
      setContent("");
    } else {
      setMessage("Please fill all fields....");
    }
  };

  const HandleUpdate = async (e) => {
    e.preventDefault();

    if (title && author && image && content) {
      const res = await axios.put(
        `/api/post/updatepost/${userId}/${postId}`,
        { userId, title, author, image, content },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage(res.data);
      setTitle("");
      setAuthor("");
      setImage("");
      setContent("");
    } else {
      setMessage("Please fill all fields....");
    }
  };

  const handleDelete = async () => {
    console.log("click");
    try {
      const res = await axios.delete(
        `/api/post/deletepost/${userId}/${postId}`,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage(res.data);
      setTitle("");
      setAuthor("");
      setImage("");
      setContent("");

      setMessage(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    try {
      const getPost = async () => {
        const res = await axios.get(
          `/api/post/getsinglepost/${users._id}/${postId}`
        );

        const data = res.data[0];

        setTitle(data.title);
        setAuthor(data.author);
        setImage(data.image);
        setContent(data.content);
      };

      if (isSubscribed) {
        getPost();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Container>
      <Post>
        <p style={{ color: "orange" }}> {message}</p>
        <Form onSubmit={(e) => (postId ? HandleUpdate(e) : HandleSubmit(e))}>
          <InputBox>
            <Label>Post Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Label>Author Name</Label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Label>Image Link</Label>
            <Input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Label>Content</Label>
            <TextArea
              rows={10}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></TextArea>
          </InputBox>
          {postId ? (
            <>
              <Button type="submit">Update</Button>
              <Button onClick={() => handleDelete()}>Delete</Button>
            </>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </Form>
      </Post>
    </Container>
  );
};

export default CreatePost;
