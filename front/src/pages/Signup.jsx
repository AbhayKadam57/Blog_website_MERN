import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, RegisterUser } from "../axiosRequests";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  z-index: 2;
  overflow: hidden;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1em;

  input {
    font-size: 1.2em;
    padding: 0.5em;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  button {
    border-radius: 2em;
    background-color: #222;
    color: white;
    cursor: pointer;
    font-size: 1.1em;
    padding: 0.3em;
    width: 200px;
  }
`;

const Links = styled(Link)`
  font-weight: 600;
  color: #020920;
`;

const SVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 95%;
`;

const Signup = () => {
  const { message } = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [fillError, setFillerror] = useState("");

  const dispatch = useDispatch();

  const HandleSubmit = (e) => {
    e.preventDefault();

    RegisterUser(dispatch, { username: username, password: Password });

    // if (username && Password) {
    //   setFillerror("");
    //   RegisterUser(dispatch, { username: username, password: Password });
    // } else {
    //   setFillerror("Please enter all fields...");
    // }
  };

  return (
    <Container>
      <Form onSubmit={(e) => HandleSubmit(e)}>
        <h1>Register Here</h1>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Register</button>
        </div>
        <small
          style={{
            color: "blue",
            backgroundColor: "white",
            borderRadius: "3px",
          }}
        >
          {message}
        </small>
        {fillError && <small style={{ color: "blue" }}>{fillError}</small>}
        <small>
          Already Login please <Links to="/login">Login</Links>
        </small>
      </Form>
      <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#ff5500"
          fill-opacity="1"
          d="M0,128L16,149.3C32,171,64,213,96,213.3C128,213,160,171,192,176C224,181,256,235,288,234.7C320,235,352,181,384,176C416,171,448,213,480,224C512,235,544,213,576,176C608,139,640,85,672,69.3C704,53,736,75,768,80C800,85,832,75,864,69.3C896,64,928,64,960,106.7C992,149,1024,235,1056,272C1088,309,1120,299,1152,250.7C1184,203,1216,117,1248,85.3C1280,53,1312,75,1344,80C1376,85,1408,75,1424,69.3L1440,64L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"
        ></path>
      </SVG>
    </Container>
  );
};

export default Signup;
