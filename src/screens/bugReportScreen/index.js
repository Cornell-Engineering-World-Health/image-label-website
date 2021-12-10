import React, { useState, useEffect } from 'react';
import { getBugReports } from '../../firebase/manage';
import { Label } from 'semantic-ui-react';

const styles = {
  // header: {
  //   color: 'black',
  //   backgroundColor: 'lightBlue',
  //   marginBottom: '2px%',
  //   padding: '0.5%',


  //   // marginRight: '2%',
  // },
  // // email: {
  // //   color: 'black',
  // //   textAlign: 'left',
  // //   marginBottom: '1%',
  // //   marginRight: '2%',
  // //   padding: '1%'
  // // },
  // message: {
  //   marginTop: '0.005%',
  //   fontSize: '100%',
  //   // marginBottom: '0.25%',
  //   // marginRight: '2%',
  //   padding: "0.01%",


  // }
  header: {
    color: 'black',
    backgroundColor: 'lightBlue',
    marginTop: '1.5%',
    marginRight: '0.05%',
  },
  email: {
    color: 'black',
    textAlign: 'left',
    marginBottom: '0.5%',
    marginRight: '0.05%',
    padding: '0.05%'
  },
  message: {
    marginBottom: '0.05%',
    padding: "0.05%",
  }
};
function BugReport({ email, message, time }) {
  return (
    <body>
      <section class="index align-left">
        <p style={styles.email}><Label style={styles.header}>Bug Reported By:&nbsp;&nbsp;&nbsp;{email}</Label></p>

        <p style={styles.message}><p style={{ fontWeight: 'bold' }}>Message:&nbsp;&nbsp;</p>{message}</p>
      </section>
    </body>


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
