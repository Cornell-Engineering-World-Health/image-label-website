import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export async function filterImages(emails, tasks) {
  console.log(emails, tasks);
  var images = [];
  if (emails.length === 0 && tasks.length === 0) {
    // button click guarantees emails.length>0 && tasks.length>0;
    alert("Internal error: Empty filter.");
  } else if (emails.length === 0) {
    // only tasks
    tasks.forEach(async (t) => {
      const docRef = doc(db, "tasks", t);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        for (const k in data) {
          if (k.includes("@")) {
            //key is email
            images += data[k];
          }
        }
      } else {
        console.log("No such task! Tried to get " + t);
      }
    });
  } else if (tasks.length === 0) {
    //only user
    emails.forEach(async (user) => {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        images = images + docSnap.data().images;
      } else {
        console.log("No such user! Tried to get " + user);
      }
    });
  } else {
    // both filter
    tasks.forEach(async (t) => {
      const docRef = doc(db, "tasks", t);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        for (const k in data) {
          if (emails.includes(k)) {
            //this task contains the user we're filter for
            images += data[k];
          }
        }
      } else {
        console.log("No such task! Tried to get " + t);
      }
    });
  }
  return images;
}
