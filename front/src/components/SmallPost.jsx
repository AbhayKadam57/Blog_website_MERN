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
  width: 32%;
  text-decoration: none;
  ${tablet({ display: "flex", width: "100%" })}
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1em;
  overflow: hidden;
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
  font-size: 1.4em;
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

const SmallPost = ({
  title,
  author,
  content,
  image,
  _id,
  userId,
  updatedAt,
}) => {
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

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Container to={`/singlepost/${_id}`}>
      <p>
        {user._id === userId && (
          <Link
            to={`/createpost?${_id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
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
        <HeadLine>{title.slice(0, 27)}...</HeadLine>
      </Content>
      <PostDetails>
        <Author>By {author}</Author>
        <Dates>{months[Month] + " " + Day + "," + Year}</Dates>
      </PostDetails>
    </Container>
  );
};

export default SmallPost;
