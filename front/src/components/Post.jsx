import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { tablet } from "../responsive";

const Container = styled(Link)`
  display: grid;
  flex-direction: column;
  padding: 1.9em;
  border-radius: 0.5em;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
  height: 100%;
  grid-row: ${(props) => props.type === "first" && "1/span 2"};
  grid-row: ${(props) => props.type === "second" && "1/span 1"};
  grid-row: ${(props) => props.type === "third" && "2/span 1"};
  grid-column: ${(props) => props.type === "first" && "1/span 1"};
  grid-column: ${(props) => props.type === "second" && "2/span 1"};
  grid-column: ${(props) => props.type === "third" && "2/span 1"};
  text-decoration: none;
  ${tablet({ display: "grid" })}
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5em;
  overflow: hidden;

  img {
    object-position: top;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`;

const Title = styled.p`
  font-size: 1.3em;
  font-weight: 600;
  color: #8bea06;
`;

const HeadLine = styled.p`
  font-size: 1.8em;
  font-weight: 600;
  color: #2e2f2d;
`;

const PostDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Author = styled.h3`
  color: #2e2f2d;
`;
const Dates = styled.h4`
  color: #2e2f2d;
`;

const Post = ({ type, title, author, image, _id, userId, updatedAt }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const postDate = new Date(updatedAt);

  const Day = postDate.getDate();

  const Month = postDate.getMonth();

  const Year = postDate.getFullYear();

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

  return (
    <Container to={`/singlepost/${_id}`} type={type}>
      <p>
        {user._id === userId && (
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            to={`/createpost?${_id}`}
            style={{ color: "red" }}
          >
            Edit
          </Link>
        )}
      </p>
      <Image>
        <img src={`${image}`} alt="imgae" />
      </Image>

      <Content>
        <Title>Cricket</Title>
        <HeadLine>{title}</HeadLine>
      </Content>
      <PostDetails>
        <Author>By {author}</Author>
        <Dates>{months[Month] + " " + Day + "," + Year}</Dates>
      </PostDetails>
    </Container>
  );
};

export default Post;
