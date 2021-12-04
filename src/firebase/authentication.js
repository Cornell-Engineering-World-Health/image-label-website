import { secondaryAuth, db } from "./setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

export const createUser = (email, group) => {
  createUserWithEmailAndPassword(secondaryAuth, email, "aurolabdefaultpassword")
    .then(function (firebaseUser) {
      alert(
        email + ": User " + firebaseUser.user.uid + " created successfully!"
      );
      secondaryAuth.signOut();
    })
    .then(async () => {
      //add to firestore
      await addDoc(collection(db, "users"), {
        email: email,
        currentTask: null,
        groupID: group,
        isAdmin: false,
        assignedImages: [],
      });

      //add to userList
      await updateDoc(doc(db, "lists", "userList"), {
        users: arrayUnion(email),
      });
    })
    .catch((error) => {
      alert(error);
    });
};
