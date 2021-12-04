import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/setup';
import { getUser } from '../../firebase/manage';

export default function Navbar() {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [adminOrNot, setAdminOrNot] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(user);
      setAuthenticated(true);
    } else {
      // User is signed out
      history.push('/');
      setAuthenticated(false);
    }
  });

  useEffect(async () => {
    if (auth.currentUser) {
      const user = await getUser(auth.currentUser.email);
      setAdminOrNot(user.isAdmin);
    }
  }, []);
  if (adminOrNot) {
    return authenticated ? (
      <nav class="banner wrapper sty align-center">
        <NavLink to="/console"> Admin Console |</NavLink>
        <NavLink to="/relabel"> Relabel |</NavLink>
        <NavLink to="/bugreports"> Bug Reports |</NavLink>
        <NavLink to="/pipeline"> Task Pipeline |</NavLink>
        <Link
          onClick={(e) => {
            e.preventDefault();
            signOut(auth)
              .then(() => {
                history.push('/');
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
  } else {
    return authenticated ? (
      <nav class="banner wrapper sty align-center">
        <NavLink to="/relabel"> Relabel |</NavLink>
        <Link
          onClick={(e) => {
            e.preventDefault();
            signOut(auth)
              .then(() => {
                history.push('/');
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
}
