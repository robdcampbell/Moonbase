import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";
import { useForm } from "react-hook-form";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";
import { ProfileImage } from "../ProfileImage";
import Feed from "../components/Feed/Feed";
import Footer from "../components/Footer";

const Profile = () => {
  const { user } = useSession();
  // Gets the Userparams to update routes later on as an Admin
  const params = useParams();
  const { register, setValue, handleSubmit } = useForm();
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
  }, [user.uid]);

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

  const formClassName = `ui big form twelve wide column ${
    isLoading ? "loading" : ""
  }`;

  return (
    <div className="profile__container">
      <div className="add-form-container">
        {/* className="ui grid stackable" */}
        <div>
          {/* <ProfileImage id={params.id} /> */}
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div
              className="profile__top"
              // style={{ backgroundColor: "lightblue" }}
            >
              <h3>Welcome, {userDocument.name}.</h3>
              {/* <div className="eight wide field"> */}
              {/* <div className="">
                <label>
                  Username
                  <input type="text" name="name" ref={register} />
                </label>
              </div>
              <div className="">
                <label>
                  Email
                  <input type="text" name="email" readOnly ref={register} />
                </label>
              </div> */}

              {/* <button
                type="submit"
                className="update__button"
                style={{
                  padding: "1rem",
                  border: "none",
                  height: "fit-content",
                  cursor: "pointer",
                  alignItems: "bottom",
                  background: "transparent",
                }}
              >
                Update Username
              </button> */}
            </div>
            {/* Profile-top */}
          </form>
        </div>
      </div>
      <Feed projects={userProjects} />

      {/* <About ? /> */}
    </div>
  );
};

export default Profile;
