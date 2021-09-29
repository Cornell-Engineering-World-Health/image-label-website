import React from "react";
import loginhero from "../../images/hololens.jpg";
// import { firebase } from "../../firebase/firebase";

export const LoginScreen = () => {

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
                  <label for="name">Username</label>
                  <input type="text" name="name" id="name" value="" />
                </div>
                <div class="field">
                  <label for="email">Password</label>
                  <input type="email" name="email" id="email" value="" />
                </div>

              </div>
              <ul class="actions special" >
                <li><input type="submit" name="submit" id="submit" value="Login" /></li>
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