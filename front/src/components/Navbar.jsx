import React, { useReducer } from "react";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  ${tablet({ gap: "10px" })}
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  h2 {
    color: #222;
  }
  span {
    color: #ee370a;
  }
`;

const Buttons = styled.div`
  display: ${(props) =>
    props.show === "/register" || props.show === "/login" ? "none" : "flex"};
  align-items: center;
  gap: 2em;
  ${tablet({ gap: "10px" })}

  button {
    background-color: transparent;
    padding: 0.5em;
    font-size: 1em;
    border: 2px solid #111;
    border-radius: 1.5em;
    min-width: 5em;
    cursor: pointer;
    font-weight: 500;
    ${tablet({ fontSize: "12px" })}

    &:hover {
      background-color: #ee370a;
      color: #fff;
    }
  }
`;

const User = styled.p`
  background-color: #ee370a;
  color: #fff;
  border: 2px solid #111;
  border-radius: 1.5em;
  padding: 10px;
  ${tablet({ fontSize: "12px" })}
`;

const Navbar = () => {
  const { user, message } = useSelector((state) => state.users);
  const { pathname } = useLocation();

  const HandleLogout = () => {
    localStorage.clear();

    window.location.reload(true);
  };

  return (
    <Container>
      <Logo>
        <h2>
          <Link to="/" style={{ textDecoration: "none", color: "#222" }}>
            Blog.<span>GO</span>
          </Link>
        </h2>
      </Logo>
      <Buttons show={pathname}>
        {user === null ? (
          <>
            {" "}
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        ) : (
          <>
            <User>{user?.username}</User>
            <Link to="/createpost">
              <button>Create Post</button>
            </Link>
            <button onClick={() => HandleLogout()}>Logout</button>
          </>
        )}
      </Buttons>
    </Container>
  );
};

export default Navbar;
