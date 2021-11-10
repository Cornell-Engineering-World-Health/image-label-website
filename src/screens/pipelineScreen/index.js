import React from "react";
import { Table } from "semantic-ui-react";

export const PipelineScreen = () => {
  return (
    <div>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <h2>Task Pipeline</h2>
          <div class="index align-left">
            <section>
              <header>
                <h3>Create Task</h3>
              </header>
              <div class="content">
                <form method="post" action="#">
                  <div class="fields">
                    <div class="field half">
                      <label for="name">Task Name</label>
                      <input type="text" name="task" id="task" value="" />
                    </div>

                    <div class="field half"></div>
                    <div class="field half">
                      <label for="name">Label Name</label>
                      <input type="text" name="label" id="label" value="" />
                    </div>

                    <div class="field half"></div>
                  </div>
                  <a href=""> +Add another label </a>
                  <br />
                  <br />
                  <button> Create</button>
                </form>
              </div>
            </section>

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
                        checked
                      />
                      <label for="priority-low">User ID</label>
                    </div>
                    <div class="field third">
                      <input
                        type="radio"
                        id="priority-normal"
                        name="priority"
                      />
                      <label for="priority-normal">Group ID</label>
                    </div>
                  </div>
                </form>
                <div class="field half">
                  <label for="image">User ID</label>
                  <select name="image" id="image">
                    <option value="">- SELECT -</option>
                    <option value="0">user id</option>
                  </select>
                </div>
                <br />
                <div class="field half">
                  <label for="image">Task</label>
                  <select name="image" id="image">
                    <option value="">- SELECT -</option>
                    <option value="0">task1</option>
                    <option value="1">task2</option>
                    <option value="2">task3</option>
                  </select>
                </div>
                <br />
                <button>Assign</button>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section class="wrapper style1 align-center">
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
      </section>
    </div>
  );
};
