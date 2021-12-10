import React, { useState, useEffect } from 'react';
import { getBugReports } from '../../firebase/manage';
import { Label } from 'semantic-ui-react';

const styles = {
  header: {
    color: 'black',
    backgroundColor: 'lightBlue',
    width: '195px',
    marginBottom: '5px',
    marginRight: '5px',
  },
  email: {
    color: 'black',
    textAlign: 'left',
    marginBottom: '2px',
    marginRight: '5px',
    marginTop: '2px',
    padding: '2px'
  },
  message: {
    marginBottom: '5px',
    marginRight: '5px',
    padding: "5px",


  }
};
function BugReport({ email, message, time }) {
  return (
    <div>
      <section class="index align-left">
        <p style={styles.email}><Label style={styles.header}>Bug Report:   {email}</Label></p>
        <p style={styles.message}>Message: {message}</p>
      </section>

    </div >
  );
}

export const BugReportScreen = () => {
  const [bugList, setBugList] = useState([]);

  useEffect(async () => {
    const bugReports = await getBugReports();
    setBugList(bugReports);
  }, []);

  function getReports() {
    const componentList = bugList.map((item) => (
      <BugReport email={item.user} message={item.description} time={item.date} />
    ));
    return componentList;
  }
  return (
    <div>
      <ul>{getReports()}</ul>
    </div>
  );
};
