import { secondaryAuth } from "./setup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const createUser = (email) => {
  createUserWithEmailAndPassword(secondaryAuth, email, "aurolabdefaultpassword")
    .then(function (firebaseUser) {
      alert(email + " User " + firebaseUser.uid + " created successfully!");
      secondaryAuth.signOut();
    })
    .catch((error) => {
      alert(error);
    });
};
