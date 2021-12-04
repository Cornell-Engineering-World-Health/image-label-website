import React, { useEffect, useState } from 'react';
import * as imageStorage from '../../firebase/imageStorage';
import * as manage from '../../firebase/manage';
import { Dropdown, Grid, Input, Label } from 'semantic-ui-react';

const styles = {
  image: {
    width: '100%',
  },
};

export const ConsoleScreen = () => {
  // [images] stores each image URL and its metadata.
  // Requires: an element in [images] has type {url: [string], metadata: [array object]}
  const [images, setImages] = useState([]);
  const [filterUsers, setFilterUser] = useState([]);
  const [filterTasks, setFilterTask] = useState([]);
  const [filtered, setFilter] = useState(false); // new filter applied
  const [noFilter, setNoFilter] = useState(true); // no filter set
  const [tasks, setTasksList] = useState([]);

  useEffect(() => {
    async function getTasksList() {
      const tlist = await manage.getTasksList();
      var tasksList = [];
      if (tlist) {
        tlist.forEach((t) => {
          tasksList.push({
            key: t,
            text: t,
            value: t,
          });
        });
      }
      setTasksList(tasksList);
    }
    getTasksList();
  }, []);

  // no filter
  useEffect(() => {
    // [getAllImages()] GETS all the users, and extracts all images associated with
    // that specific user.
    // Requires: there is at least 1 user in the collection.
    async function getAllImages() {
      const images = await imageStorage.downloadAllImages(true);
      setImages(images);
    }
    if (noFilter) {
      console.log('no filter');
      getAllImages();
    }
  }, [noFilter]);

  //filtering
  useEffect(() => {
    if (filtered) {
      setImages([]); // empty current console

      // filter results
      async function getFilteredImages() {
        if (filterUsers.length === 0 && filterTasks.length === 0) {
          // button click guarantees emails.length>0 && tasks.length>0;
          alert('Internal error: Empty filter.');
        } else if (filterUsers.length === 0) {
          // only tasks
          var taskImages = await imageStorage.downloadImageByTasks(
            filterTasks,
            true
          ); // thumbnails
          setImages(taskImages);
        } else if (filterTasks.length === 0) {
          //only user
          var userImages = await imageStorage.downloadImageByUsers(
            filterUsers,
            true
          ); // thumbnails
          setImages(userImages);
        } else {
          // both filter
          var images = await imageStorage.downloadImageByTasksAndUsers(
            filterTasks,
            filterUsers,
            true
          ); // thumbnails
          setImages(images);
        }
      }

      getFilteredImages();
      setFilter(false);
    }
  }, [filtered, filterUsers, filterTasks]);

  // [handleGetImages] translates [images] into HTML elements
  const handleGetImages = (images) => {
    return images.map((imageData) => {
      return imageData ? (
        <Grid.Column key={imageData.url}>
          <span class="image left">
            <img
              src={imageData.url}
              style={styles.image}
              alt={imageData.path}
            />
          </span>
          <br />
          <Label
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                const blob = xhr.response;
                var imgURL = window.URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.href = imgURL;
                const fileType = blob.type.replace('image/', '.'); //.jepg, for example
                tempLink.setAttribute('download', imageData.path + fileType);
                tempLink.click();
              };
              xhr.open('GET', imageData.url);
              xhr.send();
            }}
          >
            Download
          </Label>
        </Grid.Column>
      ) : (
        <></>
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
              width: '300px',
              marginBottom: '20px',
              marginRight: '80px',
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

              // no filter: show default
              if (removed.length === 0 && filterTasks.length === 0) {
                setNoFilter(true);
              }
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
              width: '300px',
              marginBottom: '20px',
              marginRight: '80px',
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

              // no filter: show default
              if (removed.length === 0 && filterUsers.length === 0) {
                setNoFilter(true);
              }
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
                        setFilterUser([...filterUsers, '']);
                      }}
                    >
                      User Email
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setFilterTask([...filterTasks, '']);
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
                        filterUsers.includes('') ||
                        filterTasks.includes('')
                      ) {
                        alert('Error: Empty filter value(s)!');
                      } else {
                        setFilter(true); // new filter applied
                        setNoFilter(false);
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
              <button title="Download">Download All</button>
            </section>

            <section>
              <Grid columns={4}>{handleGetImages(images)}</Grid>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};
