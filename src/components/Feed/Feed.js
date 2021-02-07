import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Feed.css";
import MessageSender from "./MessageSender/MessageSender";
import Post from "./Post/Post";
import { useSession } from "../../firebase/UserProvider";
import { firestore } from "../../firebase/config";

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
      <div className="feed__heading">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam velit
          nobis nisi facere magni qui, officia quas eos. Dicta debitis et,
          adipisci iure nulla quas eaque voluptas doloremque consequatur aliquid
          quaerat exercitationem. Porro ratione alias dignissimos vitae magnam.
          Quo dignissimos repellendus dolorem, autem obcaecati quaerat
          voluptates ducimus sunt aliquid ullam.
        </p>
        <h1 className="feed__heading">Ok, Let's go.</h1>
      </div>

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
