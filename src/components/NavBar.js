import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/moments-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const setCurrentUser = useSetCurrentUser();
  const handleSignOut = async() => {
    try {
      const { data } = await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  }
  const currentUser = useCurrentUser();
  const addPostIcon = (
    <NavLink
        to="/posts/create"
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="far fa-plus-square"></i>Add Post
      </NavLink>
  )
  const loggedInIcons = <>
  <NavLink
        to="/feed"
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="far fa-stream"></i>Feed
      </NavLink>
      <NavLink
        to="/liked"
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink
        to="/"
        exact
        className={styles.NavLink}
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
  </>;
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-sign-in-alt"></i>Sign In
      </NavLink>
      <NavLink
        to="/signup"
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              to="/"
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
