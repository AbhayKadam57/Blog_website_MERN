import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SearchPost } from "../axiosRequests";
import { tablet } from "../responsive";

const Container = styled.div`
  padding: 1em 2em;
  border-radius: 1em;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 1em;
  min-height: 25em;

  h1 {
    font-size: 3em;
  }
`;

const SearchButtons = styled.div`
  background-color: white;
  width: 50%;
  height: 3em;
  display: flex;
  border-radius: 2em;
  padding-left: 1em;
  font-size: 1.4em;
  ${tablet({ width: "80%", fontSize: "1em" })}
  input {
    width: 70%;
    height: 100%;
    border-bottom-left-radius: 2em;
    border-top-left-radius: 2em;
    border: none;
    outline: none;
    font-size: 1em;
    ${tablet({ width: "100%" })}
  }

  button {
    flex: 30%;
    height: 100%;
    border-radius: 2em;
    background-color: #222;
    color: white;
    cursor: pointer;
    font-size: 1.1em;
  }
`;

const SearchSection = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let SeacrhTerm = e.target.value;

    if (SeacrhTerm.length > 3) {
      SearchPost(dispatch, SeacrhTerm);
    }
  };

  return (
    <Container>
      <h1>All blog posts</h1>
      <p>Search blogs according to your test...</p>
      <SearchButtons>
        <input
          type="text"
          placeholder="Search Blog..."
          onChange={(e) => handleChange(e)}
        />
        <button>Search</button>
      </SearchButtons>
    </Container>
  );
};

export default SearchSection;
