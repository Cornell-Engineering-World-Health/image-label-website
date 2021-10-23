import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.js";
import { filterImages } from "../../firebase/images.js";
import { getDocs, collection, query } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, getMetadata } from "firebase/storage";
import { fireEvent } from "@testing-library/dom";
import { Dropdown, Grid, Input, Label } from "semantic-ui-react";

const styles = {
  image: {
    width: "100%",
  },
};

export const ConsoleScreen = () => {
  // [images] stores each image URL and its metadata.
  // Requires: an element in [images] has type {url: [string], metadata: [array object]}
  const [images, setImages] = useState([]);
  const [filterUsers, setFilterUser] = useState([]);
  const [filterTasks, setFilterTask] = useState([]);
  const [filtered, setFilter] = useState(false);
  const [initial, setInitialState] = useState(true); // initial view of console

  //tasks must align with database
  const tasks = [
    {
      key: "task1",
      text: "task1",
      value: "task1",
    },
    {
      key: "task2",
      text: "task2",
      value: "task2",
    },
    {
      key: "task3",
      text: "task3",
      value: "task3",
    },
  ];

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
            setImages((prevArray) => [
              ...prevArray,
              {
                url: url,
                metadata: fullMetadata.customMetadata,
              },
            ]);
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

  useEffect(() => {
    if (initial) {
      // [getAllImages()] GETS all the users, and extracts all images associated with
      // that specific user.
      // Requires: there is at least 1 user in the collection.
      async function getAllImages() {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
          // doc.data() is never undefined for query doc snapshots
          const imagesPerUser = doc.data().images;
          imagesPerUser.forEach((image) => {
            // GET URL & metadata of the image
            downloadImage(image);
          });
        });
      }
      getAllImages();
    } else if (filtered) {
      // filter results
      async function getFilteredImages() {
        const filteredImages = await filterImages(filterUsers, filterTasks);
        console.log(filteredImages);
        filteredImages.forEach((image) => {
          downloadImage(image);
        });
      }
      getFilteredImages();
      setFilter(false);
    }
  }, [initial, filtered]);

  //limit initial load??

  // [handleGetImages] translates [images] into HTML elements
  const handleGetImages = (images) => {
    return images.map((imageData) => {
      return (
        <Grid.Column key={imageData.url}>
          <span class="image left">
            <img src={imageData.url} style={styles.image} alt="" />
          </span>
          <br />
          <span>
            <a href="">Image Details</a>
            <br />
            {imageData.metadata.date}
            <br /> {imageData.metadata.user_id}
            <br />
          </span>
        </Grid.Column>
      );
    });
  };

  // [showUserList] shows the text fields for user emails
  const showUserList = (filterUsers) => {
    return filterUsers.map((email) => {
      return (
        <div key={filterUsers.indexOf(email)}>
          <Label color="yellow">User</Label>
          <Input
            style={{
              width: "300px",
              marginBottom: "20px",
              marginRight: "80px",
            }}
            onChange={(e) => {
              var changed = [...filterUsers];
              changed[filterUsers.indexOf(email)] = e.target.value;
              setFilterUser(changed);
            }}
            value={email}
          />
          <button
            onClick={() => {
              var removed = [...filterUsers];
              removed.splice(filterUsers.indexOf(email), 1);
              setFilterUser(removed);
            }}
          >
            remove
          </button>
          <br />
        </div>
      );
    });
  };

  // [showTaskList] shows the text fields for tasks
  const showTaskList = (filterTasks) => {
    return filterTasks.map((task) => {
      return (
        <div key={filterTasks.indexOf(task)}>
          <Label color="blue">Task</Label>
          <Dropdown
            placeholder="Select task"
            search
            selection
            options={tasks}
            style={{
              width: "300px",
              marginBottom: "20px",
              marginRight: "80px",
            }}
            onChange={(e, d) => {
              var changed = [...filterTasks];
              changed[filterTasks.indexOf(task)] = d.value;
              setFilterTask(changed);
            }}
            value={task}
          />
          <button
            onClick={() => {
              var removed = [...filterTasks];
              removed.splice(filterTasks.indexOf(task), 1);
              setFilterTask(removed);
            }}
          >
            remove
          </button>
          <br />
        </div>
      );
    });
  };

  return (
    <div>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <h2>Admin Console</h2>
          {images.length > 0 ? console.log(images) : console.log("empty")}
          <p>
            filter and download the image data by click (graphical Interface).
          </p>
          <div class="index align-left">
            <section>
              <div>
                <Dropdown text="+ Add Filter" floating>
                  <Dropdown.Menu>
                    <Dropdown.Header icon="tags" content="Filter by" />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        setFilterUser([...filterUsers, ""]);
                      }}
                    >
                      User Email
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setFilterTask([...filterTasks, ""]);
                      }}
                    >
                      Task
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div>
                {showUserList(filterUsers)}
                {showTaskList(filterTasks)}
                {filterUsers.length > 0 || filterTasks.length > 0 ? (
                  <button
                    onClick={() => {
                      if (
                        filterUsers.includes("") ||
                        filterTasks.includes("")
                      ) {
                        alert("Error: Empty filter value(s)!");
                      } else {
                        setFilter(true); // new filter
                        setInitialState(false); // not initial state
                      }
                    }}
                  >
                    Filter results
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </section>

            <section>
              <Grid columns={2}>
                {images.length > 0 && handleGetImages(images)}
              </Grid>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};
