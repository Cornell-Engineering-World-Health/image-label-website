import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.js";
import { getDocs, collection, query } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, getMetadata } from "firebase/storage";
import { fireEvent } from "@testing-library/dom";

const styles = {
  image: {
    width: "100%",
  }
}

export const ConsoleScreen = () => {
  // [images] stores each image URL and its metadata.
  // Requires: an element in [images] has type {url: [string], metadata: [array object]}
  const [images, setImages] = useState([]);

  useEffect(() => {
    // [downloadImage(url)] GETS the URL and metadata of [imagePrefix]
    // and stores this in [images]
    // Requires: [imagePrefix] is a valid folder prefix.
    // An example of a valid folder prefix is 'images/task1'.
    async function downloadImage(imagePrefix) {
      const storage = getStorage();
      const imageRef = ref(storage, imagePrefix);

      // GET [imagePrefix] URL
      await getDownloadURL(ref(storage, imagePrefix))
        .then((url) => {

          // Get metadata properties
          getMetadata(imageRef)
            .then((fullMetadata) => {
              // Store the URL & metadata in [images]
              setImages(prevArray =>
                [...prevArray,
                {
                  url: url,
                  metadata: fullMetadata.customMetadata
                }]
              )
            })
            .catch((error) => {
              // Error getting metadata
              console.log(error);
            });
        })
        .catch((error) => {
          // Error getting URL
          console.log(error);
        });
    }

    // [getAllImages()] GETS all the users, and extracts all images associated with
    // that specific user. 
    // Requires: there is at least 1 user in the collection.
    async function getAllImages() {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        const imagesPerUser = doc.data().images;
        imagesPerUser.forEach(image => {
          // GET URL & metadata of the image
          downloadImage(image);
        })
      });
    }

    getAllImages();
  }, [])

  // [handleGetImages] translates [images] into HTML elements
  const handleGetImages = (images) => {
    return images.map((imageData) => {
      return (
        <div class="grid-item">
          <span class="image left">
            <img src={imageData.url} style={styles.image} alt="" />
          </span>
          <br />
          <span>
            <a href="">Image Details</a>
            <br />{imageData.metadata.date}
            <br /> {imageData.metadata.user_id}
            <br />
          </span>
        </div>
      );
    })
  }

  return (
    <div>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <h2>Admin Console</h2>
          {images.length > 0 ? console.log(images) : console.log("empty")}
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

            </section>

            <section>
              <div class="grid-container">
                {images.length > 0 && (
                  handleGetImages(images)
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};