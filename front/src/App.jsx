import { useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Containers = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const { user } = useSelector((state) => state.users);

  return (
    <Containers>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <LoginPage />} />
          <Route path="/singlepost/:id" element={<SinglePost />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
        </Routes>
      </Router>
    </Containers>
  );
}

export default App;
