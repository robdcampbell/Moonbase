import firebase from "firebase/app";
import "firebase/auth";
import { createUserDocument } from "./user";

// the data is gathered from the react-hook-form
//**** SIGN UP USER****
export const signup = async ({ firstName, lastName, email, password }) => {
  const resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  // Get the User from the response from Firebase
  const user = resp.user;
  // Firebase displayName is updated (i.e. updateProfile to update user data, not DB info)
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  // When a user successfully signsup, we create a document for the user in the "Users" collection
  await createUserDocument(user);
  //Return user to be accessed elsewhere by accesing the "signup" function
  return user;
};

// ****LOGOUT USER****
export const logout = () => {
  // returns a promise
  return firebase.auth().signOut();
};

// ****LOGIN USER****
export const login = async ({ email, password }) => {
  const resp = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return resp.user;
};

// ****LOG IN AS GUEST USER****
