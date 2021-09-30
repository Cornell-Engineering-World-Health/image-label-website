import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signIn } from "../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import loginhero from "../../images/hololens.jpg";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div>
      {/* Wrapper */}
      <div id="wrapper" class="divided">

        {/* One */}
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
              <ul class="actions special" >
                <li>
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                          const user = userCredential.user;
                          history.push("/dashboard");
                        })
                        .catch((error) => {
                          console.log(error);
                          alert(error);
                        })
                    }}
                  />
                </li>
              </ul>
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