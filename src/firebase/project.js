// functions that update user data
// Functions where the project cards can be edited

import { firestore } from "./config";

export const createProjectCollection = async (user) => {
  // get a reference to the firestore doc of a particular User ie.
  // ( App Cloud Firestore / Users / Logged in User .
  const docRef = firestore.doc(`/users/${user.uid}`);

  //option 2
  const projectsCollectionRef = firestore
    .doc(`/users/${user.uid}/`)
    .collection("projects");

  // create user object //** THIS IS WHERE YOU COULD CREATE A NEW COLLECTION? POSTS DOC? */
  /*
  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    specialty: "",
    ip: "",
    // Option 1) trying this out. Create a doc, that is an array, then push objects (new posts) to this array?
    posts: [],
  };
*/

  //example project
  const projectTest = {
    id: 1,
    description: "This is an example project",
    deadline: "Februrary 1st",
  };

  //
  projectsCollectionRef.set(projectTest);

  //write to cloud firestore
  return docRef.set(userProfile);
};
