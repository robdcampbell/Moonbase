// functions that update user data
// Functions where the project cards can be edited

import { firestore, storage } from "./config";

export const createUserDocument = async (user) => {
  // get a reference to the firestore doc of a particular User ie.
  // ( App Cloud Firestore / Users / Logged in User .
  const docRef = firestore.doc(`/users/${user.uid}`);

  // ADD DEFAULT PROJECTS COLLECTION ON USER SIGNUP, so default project shows up in feed.
  const projectsCollectionRef = firestore
    .doc(`/users/${user.uid}/`)
    .collection("projects")
    .doc("DEFAULT_PROJECT");

  // create user object //** THIS IS WHERE YOU COULD CREATE A NEW COLLECTION? POSTS DOC? */
  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    // Get rid of the these additional fields as well
  };

  //example project
  const projectTest = {
    description: "This is an example project",
    deadline: "May 29",
    title: "Welcome to your first project",
    status: "in-progress",
    docId: "DEFAULT_PROJECT",
  };

  //
  projectsCollectionRef.set(projectTest);

  //write to cloud firestore
  return docRef.set(userProfile);
};

// UPDATE USER DOCUMENT
export const updateUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);
  docRef.update(user);
};

// Upload image
export const uploadImage = (userId, file, progress) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `users/${userId}/profile-image`;
    const fileRef = storage.ref().child(filePath);

    // upload task
    const uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => progress(snapshot),
      (err) => reject(err),
      () => {
        resolve(uploadTask.snapshot.ref);
      }
    );
  });
};

export const getDownloadURL = (userId) => {
  const filePath = `users/${userId}/profile-image`;
  return storage.ref().child(filePath).getDownloadURL();
};
