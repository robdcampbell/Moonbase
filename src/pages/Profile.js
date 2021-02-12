import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";
import { useForm } from "react-hook-form";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";
import Feed from "../components/Feed/Feed";
import "./Profile.css";

const Profile = (props) => {
  const { user } = useSession();
  // Gets the Userparams to update routes later on as an Admin
  const params = useParams();
  const { setValue, handleSubmit } = useForm(); //register,
  const [userDocument, setUserDocument] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //User Data
  useEffect(() => {
    // create a Firebase Document Reference to speciic user
    const docRef = firestore.collection("users").doc(params.id);
    //Listen for realtime changes
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
        // Re-populate form data, will most likely remove
        for (const [key, value] of Object.entries(documentData)) {
          //console.log(key, value);
          setValue(`${key}`, `${value}`);
        }
      }
    });
    return unsubscribe;
  }, [user.uid, setValue, params.id]);

  //User PROJECTS Collection (come back to after viewing how to display all Users from a collection)
  useEffect(() => {
    // create a Firebase Document Reference to speciic user
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");
    //Listen for realtime changes
    const unsubscribe = projectsRef.onSnapshot((querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());
      setUserProjects(projects);
    });
    return unsubscribe;
  }, [user.uid, params.id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUserDocument({ uid: params.id, ...data });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (!userDocument) {
    return null;
  }

  return (
    <div className="profile__container">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="user__welcomeHeading">
              Welcome, {userDocument.name}.
            </h3>
          </div>
        </form>
      </div>
      <Feed projects={userProjects} />

      {/* <About ? /> */}
    </div>
  );
};

export default Profile;
