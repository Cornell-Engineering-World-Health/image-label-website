import React from "react";
import { db } from "../../firebase/firebase.js";
import { getDocs, collection, query } from "firebase/firestore";

function BugReport(email, message, time) {
  return (<body>
    <h1>Bug Report {time}</h1>
    <h2>Reported By: {email}</h2>
    <p>Message: {message}</p>
  </body>)
}

export const BugReportScreen = () => {
  function getReports() {
    const allReports = query(collection(db, "bugs"));
    const querySnapshot = getDocs(allReports);
    const componentList = querySnapshot.map((docSnap) =>
      <BugReport
        email={docSnap.get("email")}
        message={docSnap.get("message")}
      />)
    return componentList
  }
  return (
    <div>
      <h1>testText</h1>
      <ul>{getReports()}</ul>
    </div>
  );
};
