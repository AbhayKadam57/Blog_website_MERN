import React from "react";
import styled from "styled-components";
import FeaturePost from "../components/FeaturePost";
import SearchSection from "../components/SearchSection";
import Allblogs from "../components/Allblogs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
  width: 100%;
`;

const Home = () => {
  return (
    <Container>
      <FeaturePost />
      <SearchSection />
      <Allblogs />
    </Container>
  );
};

export default Home;
