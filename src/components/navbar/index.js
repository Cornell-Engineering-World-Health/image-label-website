import React, { useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { NavLink, Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/setup";

export default function Navbar() {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(user);
      setAuthenticated(true);
    } else {
      // User is signed out
      console.log("no");
      setAuthenticated(false);
    }
  });

  return authenticated ? (
    <nav class="banner wrapper sty align-center">
      {/* <NavLink to="/dashboard">Dashboard |</NavLink> */}
      <NavLink to="/console"> Admin Console |</NavLink>
      <NavLink to="/relabel"> Relabel |</NavLink>
      <NavLink to="/imagemap"> Image Map |</NavLink>
      <NavLink to="/pipeline"> Task Pipeline |</NavLink>
      <Link
        onClick={(e) => {
          e.preventDefault();
          signOut(auth)
            .then(() => {
              history.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Sign Out
      </Link>
    </nav>
  ) : (
    <nav class="banner wrapper sty align-center">
      <NavLink to="/">LOGIN |</NavLink>
      <NavLink to="/about"> ABOUT |</NavLink>
    </nav>
  );
}
