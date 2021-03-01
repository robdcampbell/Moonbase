import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";
import { useForm } from "react-hook-form";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";
import Feed from "../components/Feed/Feed";

const Profile = (props) => {
  const { user } = useSession();
  // Gets the Userparams to update routes later on as an Admin
  const params = useParams();
  const { setValue, handleSubmit } = useForm(); //register,
  const [userDocument, setUserDocument] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // USER DATA
  useEffect(() => {
    const docRef = firestore.collection("users").doc(params.id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);

        for (const [key, value] of Object.entries(documentData)) {
          setValue(`${key}`, `${value}`);
        }
      }
    });
    return unsubscribe;
  }, [user.uid, setValue, params.id]);

  // USER PROJECTS
  useEffect(() => {
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");
    const unsubscribe = projectsRef.onSnapshot((querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());
      setUserProjects(projects);
    });
    return unsubscribe;
  }, [user.uid, params.id]);

  // const onSubmit = async (data) => {
  //   try {
  //     setLoading(true);
  //     await updateUserDocument({ uid: params.id, ...data });
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (!userDocument) {
    return null;
  }

  return (
    <div className="profile__container">
      <div className="feed__container">
        <Feed projects={userProjects} userName={userDocument.name} />
      </div>
    </div>
  );
};

export default Profile;
