import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import * as authentication from "../../firebase/authentication.js";
import * as manage from "../../firebase/manage.js";

export const PipelineScreen = () => {
  // *******************************  CREATE USER **************************************
  const [email, setEmail] = useState("");
  const [userGroup, setUserGroup] = useState("");

  function createUser() {
    if (email.indexOf("@") === -1) {
      alert("Please enter a valid email address");
      return;
    }

    authentication.createUser(email, userGroup);

    setEmail("");
    setUserGroup("");
  }

  // *******************************  CREATE TASK **************************************
  const [task, setTask] = useState("");
  const [labels, setLabels] = useState([""]);

  async function createTask() {
    if (task.length === 0) {
      alert("Please enter a task");
      return;
    }
    if (task.indexOf("/") !== -1) {
      alert("Task cannot contain '/'.");
      return;
    }
    if (labels.includes("")) {
      alert("Can't add empty label(s)!");
      return;
    }

    await manage.createTask(task, labels);

    // clear fields
    setLabels([""]);
    setTask("");
  }

  const showLabelsList = (labels) => {
    return labels.map((l, idx) => {
      return (
        <div key={idx}>
          <div class="field half">
            <label for="name">Label Name</label>
            <input
              style={{ width: "50%" }}
              type="text"
              name="label"
              id="label"
              value={l}
              onChange={(e) => {
                var edited = [...labels];
                edited[idx] = e.target.value;
                setLabels(edited);
              }}
            />
            {idx === 0 ? (
              <></>
            ) : (
              <>
                <br />
                <button
                  onClick={() => {
                    var removed = [...labels];
                    removed.splice(idx, 1);
                    setLabels(removed);
                  }}
                >
                  remove
                </button>
              </>
            )}
          </div>
          <br />
        </div>
      );
    });
  };

  // *******************************  ASSIGN TASK **************************************
  const [assignByUserId, setAssign] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    //gets all users and tasks in the database
    async function getUsersList() {
      const ulist = await manage.getUsersList();
      if (ulist) setUsersList(ulist);
    }
    getUsersList();

    async function getTasksList() {
      const tlist = await manage.getTasksList();
      if (tlist) setTasksList(tlist);
    }
    getTasksList();

    async function getGroupsList() {
      const glist = await manage.getGroupsList();
      if (glist) setGroupsList(glist);
    }
    getGroupsList();
  }, []);

  const showList = (l) => {
    return l.map((u) => {
      return <option value={u}>{u}</option>;
    });
  };

  async function assignTaskToUser() {
    const assignToUser = document.getElementById("selectUserOrGroup").value;
    const assignTask = document.getElementById("selectTask").value;
    console.log(assignToUser);
    console.log(assignTask);
    if (assignToUser.length === 0) {
      alert("Please select a user");
      return;
    }
    if (assignTask.length === 0) {
      alert("Please select a task");
      return;
    }

    await manage.assignTaskToUser(assignToUser, assignTask);

    //change select to default
    document.getElementById("selectTask").selectedIndex = "";
    document.getElementById("selectUserOrGroup").selectedIndex = "";
  }

  async function assignTaskToGroup() {
    const assignToGroup = document.getElementById("selectUserOrGroup").value;
    const assignTask = document.getElementById("selectTask").value;
    console.log(assignToGroup);
    console.log(assignTask);
    if (assignToGroup.length === 0) {
      alert("Please select a group");
      return;
    }
    if (assignTask.length === 0) {
      alert("Please select a task");
      return;
    }

    await manage.assignTaskToGroup(assignToGroup, assignTask);

    //change select to default
    document.getElementById("selectTask").selectedIndex = "";
    document.getElementById("selectUserOrGroup").selectedIndex = "";
  }

  // ******************************* TASK SUMMARY **************************************

  return (
    <div>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <h2>Task Pipeline</h2>
          <div class="index align-left">
            {/* *******************************  CREATE USER ************************************** */}
            <section>
              <header>
                <h3>Create User</h3>
              </header>
              <div class="content">
                <div class="fields">
                  <div class="field half">
                    <label for="name">User Email</label>
                    <input
                      type="text"
                      name="task"
                      id="task"
                      style={{ width: "50%" }}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <br />
                    <label for="name">Group</label>
                    <input
                      type="text"
                      name="group"
                      id="group"
                      style={{ width: "50%" }}
                      value={userGroup}
                      onChange={(e) => {
                        setUserGroup(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <br />
                <br />
                <button
                  onClick={() => {
                    createUser();
                  }}
                >
                  Create User
                </button>
              </div>
            </section>

            {/* *******************************  CREATE TASK ************************************** */}
            <section>
              <header>
                <h3>Create Task</h3>
              </header>
              <div class="content">
                <div class="fields">
                  <div class="field half">
                    <label for="name">Task Name</label>
                    <input
                      type="text"
                      name="task"
                      id="task"
                      style={{ width: "50%" }}
                      value={task}
                      onChange={(e) => {
                        setTask(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <div class="field half"></div>
                  <div class="field half">{showLabelsList(labels)}</div>

                  <div class="field half"></div>
                </div>
                <a
                  onClick={() => {
                    setLabels([...labels, ""]);
                  }}
                >
                  +Add another label
                </a>
                <br />
                <br />
                <button
                  onClick={() => {
                    createTask();
                  }}
                >
                  Create Task
                </button>
              </div>
            </section>

            {/* *******************************  ASSIGN TASK ************************************** */}
            <section>
              <header>
                <h3>Assign Task</h3>
              </header>
              <div class="content">
                <form method="post" action="#">
                  <div class="fields">
                    <div class="field">
                      <label for="name">By User ID or Group ID?</label>
                    </div>
                    <div class="field third">
                      <input
                        type="radio"
                        id="priority-low"
                        name="priority"
                        checked={assignByUserId}
                        onClick={() => {
                          setAssign(true);
                        }}
                      />
                      <label for="priority-low">User ID</label>
                    </div>
                    <div class="field third">
                      <input
                        type="radio"
                        id="priority-normal"
                        name="priority"
                        checked={!assignByUserId}
                        onClick={() => {
                          setAssign(false);
                        }}
                      />
                      <label for="priority-normal">Group ID</label>
                    </div>
                  </div>
                </form>
                <div class="field half">
                  <label for="image">
                    {assignByUserId ? "User ID" : "Group ID"}
                  </label>
                  <select id="selectUserOrGroup">
                    <option value="">- SELECT -</option>
                    {assignByUserId
                      ? showList(usersList)
                      : showList(groupsList)}
                  </select>
                </div>
                <br />
                <div class="field half">
                  <label for="image">Task</label>
                  <select id="selectTask">
                    <option value="">- SELECT -</option>
                    {showList(tasksList)}
                  </select>
                </div>
                <br />
                <button
                  onClick={() => {
                    if (assignByUserId) {
                      assignTaskToUser();
                    } else {
                      assignTaskToGroup();
                    }
                  }}
                >
                  Assign
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* *******************************  TASK SUMMARY ************************************** */}
      {/* <section class="wrapper style1 align-center">
        <div class="inner">
          <h2>Task Summary</h2>

          <section>
            <header>
              <h3 class="align-left">Task 1</h3>
            </header>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>User ID</Table.HeaderCell>
                  <Table.HeaderCell>Task</Table.HeaderCell>
                  <Table.HeaderCell>Group ID</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John Lilki</Table.Cell>
                  <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                  <Table.Cell>123123</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie Harington</Table.Cell>
                  <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                  <Table.Cell>123123</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jill Lewis</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                  <Table.Cell>123123</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <br />
          </section>

          <section>
            <header>
              <h3 class="align-left">Task 2</h3>
            </header>
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>User ID</Table.HeaderCell>
                  <Table.HeaderCell>Task</Table.HeaderCell>
                  <Table.HeaderCell>Group ID</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John Lilki</Table.Cell>
                  <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                  <Table.Cell>123123</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie Harington</Table.Cell>
                  <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                  <Table.Cell>123123</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jill Lewis</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                  <Table.Cell>123123</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <br />
          </section>
        </div>
      </section> */}
    </div>
  );
};
