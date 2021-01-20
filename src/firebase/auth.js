import firebase from "firebase/app";
import "firebase/auth";

// the data is gathered from the react-hook-form
export const signup = async ({ firstName, lastName, email, password }) => {
  const resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  await resp.user.updateProfile({ displayName: `${firstName} ${lastName}` });
};
