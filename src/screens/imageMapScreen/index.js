import React from "react";

export const ImageMapScreen = () => {
  return (
    <div id="wrapper" class="divided">
      <section class="wrapper style1 align-center">
        <div class="inner">
          <h2>Image Map</h2>
          <img src="" id="myimg" />

          <div class="index align-left">
            <section>

              <div class="content">


                <span class="image fit"><img src="images/dotmap.jpg" alt="" /></span>


              </div>
            </section>

            <section>
              <header>
                <h3>Filter Image Dots by</h3>
              </header>
              <div class="content">

                <form method="post" action="#">
                  <div class="fields">
                    <div class="field half">
                      <label for="name">Start Date</label>
                      <input type="date" id="start" name="trip-start" />
                    </div>
                    <div class="field half">
                      <label for="name">End Date</label>
                      <input type="date" id="end" name="trip-end" />
                    </div>


                    <div class="field half">
                      <label for="name">Group ID</label>
                      <input type="text" name="groupid" id="groupid" value="" />
                    </div>

                    <div class="field half">
                    </div>
                    <div class="field half">
                      <label for="name">User ID</label>
                      <input type="text" name="userid" id="userid" value="" />
                    </div>

                    <div class="field half">
                    </div>


                    <div class="field half">
                      <label for="image">Image Type</label>
                      <select name="image" id="image">
                        <option value="">- Category -</option>
                        <option value="0">SELECT ALL</option>
                        <option value="1">Indian Currency</option>
                        <option value="2">People</option>
                        <option value="3">Document-Text-OCR</option>
                        <option value="4">Stairs</option>
                        <option value="5">Doors</option>
                        <option value="6">Indian Bus</option>
                      </select>
                    </div>
                    <div class="field half">
                    </div>

                    <div class="field">
                      <label for="name">Max number of Images</label>
                    </div>
                    <div class="field third">
                      <input type="radio" id="priority-low" name="priority" checked />
                      <label for="priority-low">All Images</label>
                    </div>
                    <div class="field third">
                      <input type="radio" id="priority-normal" name="priority" />
                      <label for="priority-normal">Top 100</label>
                    </div>
                    <div class="field third">
                      <input type="radio" id="priority-high" name="priority" />
                      <label for="priority-high">Top 10</label>
                    </div>

                  </div>

                  <ul class="actions">
                    <li><a href="#" class="button primary">Filter Image Dots on Map</a></li>
                  </ul>

                </form>

              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};