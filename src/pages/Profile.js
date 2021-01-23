import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";
import { useForm } from "react-hook-form";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";
import { ProfileImage } from "../ProfileImage";
import Feed from "../components/Feed/Feed";

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
    const docRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");
    //Listen for realtime changes
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserProjects(documentData);
      }
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
    <div>
      {/* <p>{JSON.stringify(userDocument)}</p>
      <p>{JSON.stringify(userProjects)}</p> */}
      {/* Imported form, to be edited */}
      <div
        className="add-form-container"
        style={{ maxWidth: 960, margin: "50px auto" }}
      >
        <div className="ui grid stackable">
          <ProfileImage id={params.id} />
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="fields">
              <div className="eight wide field">
                <label>
                  Name
                  <input type="text" name="name" ref={register} />
                </label>
              </div>
              <div className="eight wide field">
                <label>
                  Email
                  <input type="text" name="email" readOnly ref={register} />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="ui submit large grey button right floated"
            >
              Change/Update Name
            </button>
          </form>
        </div>
      </div>
      <Feed />
    </div>
  );
};

export default Profile;

/* 

OLD FIELDS : KEEP TEMPORARILY 
              
            <div className="fields">
              <div className="six wide field">
                <label>
                  Address
                  <input type="text" name="address" ref={register} />
                </label>
              </div>
              <div className="five wide field">
                <label>
                  City
                  <input type="text" name="city" ref={register} />
                </label>
              </div>
              <div className="two wide field">
                <label>
                  State
                  <input type="text" name="state" ref={register} />
                </label>
              </div>
              <div className="three wide field">
                <label>
                  Zip
                  <input type="text" name="zip" ref={register} />
                </label>
              </div>
            </div> 

             <div className="equal width fields">
              <div className="field">
                <label>
                  Phone
                  <input type="text" name="phone" ref={register} />
                </label>
              </div>
              <div className="field">
                <label>
                  Specialty
                  <select className="specialty" name="specialty" ref={register}>
                    <option value="field agent">Field Agent</option>
                    <option value="covert operations">Covert Operations</option>
                    <option value="intelligence officer">
                      Intelligence Officer
                    </option>
                  </select>
                </label>
              </div>
              <div className="field">
                <label>
                  ip
                  <input type="text" name="ip" ref={register} />
                </label>
              </div>
            </div> 

*/
