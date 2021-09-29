import React from "react";

export const ConsoleScreen = () => {

  return (
    <div>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <h2>Admin Console</h2>
          <p>filter and download the image data by click (graphical Interface).</p>
          <div class="index align-left">


            <section>
              <header>
                <h3>Filter by</h3>
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
                    <li><input type="submit" name="submit" id="submit" value="Filter" /></li>
                  </ul>

                </form>

              </div>
            </section>


            <section>
              <header>
                <h3>Filter Results</h3>
              </header>
              <div class="content">


                <ul class="alt">
                  <li>Total Size of Filtered Images and Labels (MB): xxx MB</li>
                  <li>Total Number of Images Filtered: yy</li>
                  <li>Number of Users: zz</li>

                </ul>

              </div>
              <br />

            </section>

            <section>
              <ul class="actions">
                <li><a href="#" class="button primary">Download Filtered data as Zip</a></li>
              </ul>
            </section>

            <section>
              <div class="grid-container">
                <div class="grid-item">
                  <span class="image left"><img src="images/pic01.jpg" alt="" /></span><br />
                  <span>
                    <a href="">Image Details</a>
                    <br />Time of Image Upload
                    <br />Number of labels
                    <br /> User Id <br />
                  </span>
                </div>

                <div class="grid-item">
                  <span class="image left"><img src="images/pic02.jpg" alt="" /></span><br />
                  <span>
                    <a href="">Image Details</a>
                    <br />Time of Image Upload
                    <br />Number of labels
                    <br /> User Id <br />
                  </span>

                </div>

                <div class="grid-item">
                  <span class="image left"><img src="images/pic03.jpg" alt="" /></span><br />
                  <span>
                    <a href="">Image Details</a>
                    <br />Time of Image Upload
                    <br />Number of labels
                    <br /> User Id <br />
                  </span>

                </div>

                <div class="grid-item">
                  <span class="image left"><img src="images/pic04.jpg" alt="" /></span><br />
                  <span>
                    <a href="">Image Details</a>
                    <br />Time of Image Upload
                    <br />Number of labels
                    <br /> User Id <br />
                  </span>

                </div>

              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};