import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/setup';
import { signInWithEmailAndPassword } from '@firebase/auth';
import loginhero from '../../images/hololens.jpg';
import { getUser } from '../../firebase/manage';

const styles = {
  error: {
    color: 'red',
  },
};

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  async function directUser(email) {
    const user = await getUser(email);
    sessionStorage.clear()
    if (user.isAdmin) {
      sessionStorage.setItem("isAdmin", "true");
      history.push('/console');
      window.location.reload()
    } else {
      sessionStorage.setItem("isAdmin", "false");
      history.push('/relabel');
    }
  }

  return (
    <div>
      <div id="wrapper" class="divided">
        <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
          <div class="content">
            <h1>Auro Image</h1>
            <p class="major">
              Please enter your user name and password to log in
            </p>

            <form method="post" action="#">
              <div class="fields">
                <div class="field">
                  <label for="email">Username</label>
                  <input
                    type="text"
                    name="email"
                    id="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="field">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <p style={styles.error}>{errorMessage}</p>
              <ul class="actions special">
                <li>
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (email === '') {
                        setErrorMessage('Please enter in a valid email.');
                      } else if (password === '') {
                        setErrorMessage('Please enter in a password.');
                      } else {
                        signInWithEmailAndPassword(auth, email, password)
                          .then((userCredential) => {
                            const user = userCredential.user;
                            setErrorMessage('');
                            directUser(email);
                          })
                          .catch((error) => {
                            if (error.code === 'auth/wrong-password') {
                              setErrorMessage(
                                'Wrong password. Please try again.'
                              );
                            } else if (error.code === 'auth/user-not-found') {
                              setErrorMessage('Username not found.');
                            } else {
                              setErrorMessage(
                                'Login failed. Please try again at a later time.'
                              );
                            }
                            console.log(error.code);
                          });
                      }
                    }}
                  />
                </li>
              </ul>
              <p>
                No account? <NavLink to={'/console'}>Sign up</NavLink>
              </p>
            </form>
          </div>

          <div class="image">
            <img src={loginhero} alt="" />
          </div>
        </section>
      </div>
    </div>
  );
};
