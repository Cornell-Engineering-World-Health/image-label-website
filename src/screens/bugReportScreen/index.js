import React, { useState, useEffect } from 'react';
import { getBugReports } from '../../firebase/manage';
function BugReport({ email, message, time }) {
  return (
    <body>
      <h1>Bug Report {time}</h1>
      <h2>Reported By: {email}</h2>
      <p>Message: {message}</p>
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
      <BugReport email={item.user} message={item.description} />
    ));
    return componentList;
  }
  return (
    <div>
      <ul>{getReports()}</ul>
    </div>
  );
};
