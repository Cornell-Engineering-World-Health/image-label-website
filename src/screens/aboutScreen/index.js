import React from "react";
import abouthero from "../../images/hololensblur.jpg";

export const AboutScreen = () => {

  return (
    <div id="wrapper" class="divided">
      <section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
        <div class="content">
          <h1>About Us</h1>
          <p class="major">We are building a full-stack device (software + hardware) for low-visison people at low cost </p>
          <p class="major">... Details goes here ...</p>
        </div>

        <div class="image">
          <img src={abouthero} alt="" />
        </div>
      </section>
    </div>

  );
};