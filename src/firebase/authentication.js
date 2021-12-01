import { secondaryAuth } from "./setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, getDoc, arrayUnion, setDoc } from "firebase/firestore";

export const createUser = (email) => {
  createUserWithEmailAndPassword(secondaryAuth, email, "aurolabdefaultpassword")
    .then(function (firebaseUser) {
      alert(
        email + ": User " + firebaseUser.user.uid + " created successfully!"
      );
      secondaryAuth.signOut();
    })
    .then(() => {
      //add to firestore
    })
    .catch((error) => {
      alert(error);
    });
};
