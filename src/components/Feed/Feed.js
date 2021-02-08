import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Feed.css";
import MessageSender from "./MessageSender/MessageSender";
import Post from "./Post/Post";
import { useSession } from "../../firebase/UserProvider";
import { firestore } from "../../firebase/config";
import Modal from "../Modal/Modal";

const Feed = () => {
  const { user } = useSession();
  const [userProjects, setUserProjects] = useState([]);
  const params = useParams();
  const [numberOfProjects, setNumberOfProjects] = useState(0);

  useEffect(() => {
    // ORDERING POST BY TIMESTAMP, aka most recent. come back to this and use to update docID and updateProject function
    // db.collection("posts")
    //   .orderBy("timestamp", "desc")
    //   .onSnapshot((snapshot) =>
    //     setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    //   );
  }, []);

  //User PROJECTS Collection (come back to after viewing how to display all Users from a collection)
  useEffect(() => {
    // create a Firebase Document Reference to speciic user
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");

    //Listen for realtime changes
    // projectsRef.onSnapshot((querySnapshot) => {
    //   querySnapshot.docs.map((doc) => console.log(doc));
    // });

    const unsubscribe = projectsRef.onSnapshot((querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());
      setUserProjects(projects);
    });
    return unsubscribe;
  }, [user.uid]);

  return (
    <div className="feed">
      {/* <div className="feed__heading">
        <h2>"Never give up - and good luck will find you" - Falkor</h2>
        <h3 className="feed__heading">(Ok, Let's go.)</h3>
      </div> */}

      <h2 className="add__heading">Create a new project:</h2>

      <MessageSender />
      {/* ${numberOfProjects}  */}
      <h2 className="projects__heading">{`Projects Dashboard:`}</h2>

      {/* description, id, deadline */}
      <div className="dashboard">
        {userProjects.map((project, index) => {
          const { id, description, deadline, title, status, docId } = project;

          return (
            <Post
              key={docId}
              id={id}
              index={index}
              description={description}
              deadline={deadline}
              projectTitle={title}
              status={status}
              docId={docId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
