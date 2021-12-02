import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, getDocs, query } from "@firebase/firestore";
import loginhero from "../../images/hololens.jpg";

const styles = {
  error: {
    color: "red",
  }
}

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  async function directUser(email) {
    const x = await getDocs(query(collection(db, "users")))
    x.forEach(o => {
      if (o.data().email == email) {
        if (o.data().isAdmin) {
          history.push('/console')
        } else {
          history.push('/relabel')
        }
      }
    })
  }

  return (
    <div>
      {/* Wrapper */}
      <div id="wrapper" class="divided">

        <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
          <div class="content">
            <h1>Auro Image</h1>
            <p class="major">Please enter your user name and password to log in</p>

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
              <ul class="actions special" >
                <li>
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (email === "") {
                        setErrorMessage("Please enter in a valid email.");
                      } else if (password === "") {
                        setErrorMessage("Please enter in a password.");
                      } else {
                        signInWithEmailAndPassword(auth, email, password)
                          .then((userCredential) => {
                            const user = userCredential.user;
                            setErrorMessage("");
                            directUser(email)
                          })
                          .catch((error) => {
                            if (error.code === "auth/wrong-password") {
                              setErrorMessage("Wrong password. Please try again.");
                            } else if (error.code === "auth/user-not-found") {
                              setErrorMessage("Username not found.");
                            } else {
                              setErrorMessage("Login failed. Please try again at a later time.")
                            }
                            console.log(error.code);
                            //console.log(error.message)
                          })
                      }
                    }}
                  />
                </li>
              </ul>
              <p> No account? <NavLink to={"/console"}>Sign up</NavLink></p>
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