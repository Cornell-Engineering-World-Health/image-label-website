import React from "react";

export const LoginScreen = () => {

  return (
    <div>
      {/* Wrapper */}
      <div id="wrapper" class="divided">

        <nav class="banner wrapper sty align-center">
          <a href="login.html">LOGIN</a> |
          <a href="about.html">ABOUT</a> |
        </nav>

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
              <ul class="actions special">
                <li><input type="submit" name="submit" id="submit" value="Login" /></li>
              </ul>
            </form>

          </div>


          <div class="image">
            <img src="images/hololens.jpg" alt="" />
          </div>
        </section>

        {/* Footer */}
        <footer class="wrapper style1 align-center">
          <div class="inner">
            <p>&copy; 2021 <a href="about.html">Aurolab Image</a></p>
          </div>
        </footer>

      </div>
    </div>
  );
};