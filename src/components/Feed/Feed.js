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

  useEffect(() => {
    // db.collection("posts")
    //   .orderBy("timestamp", "desc")
    //   .onSnapshot((snapshot) =>
    //     setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    //   );
  }, []);

  /*
      key={post.id}
      profilePic={post.data.profilePic}
      message={post.data.message}
      timestamp={post.data.timestamp}
      username={post.data.username}
      image={post.data.image}
    */

  //User PROJECTS Collection (come back to after viewing how to display all Users from a collection)
  useEffect(() => {
    // create a Firebase Document Reference to speciic user
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");
    //Listen for realtime changes

    projectsRef.onSnapshot((querySnapshot) => {
      querySnapshot.docs.map((doc) => console.log(doc));
    });

    const unsubscribe = projectsRef.onSnapshot((querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());
      //console.log(projects);
      setUserProjects(projects);
    });
    return unsubscribe;
  }, [user.uid]);

  return (
    <div className="feed">
      <div className="feed__heading">
        <h1 className="feed__heading">{`Let's get crackin'.`}</h1>
      </div>

      <h2 className="add__heading">Add a project:</h2>
      <MessageSender />

      <h2 className="projects__heading">Ongoing projects:</h2>
      {/* description, id, deadline */}
      {userProjects.map((project, index) => {
        const { id, description, deadline, title, status, docId } = project;
        //console.log(project);

        return (
          <Post
            key={id}
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

      {/*  

        POSTS

      {posts.map((post) => {
        const {
          id,
          data: { profilePic, message, timestamp, username, image },
        } = post;
        return (
          <Post
            key={id}
            profilePic={profilePic}
            message={message}
            timestamp={timestamp}
            username={username}
            image={image}
          />
        );
      })}
      */}
    </div>
  );
};

export default Feed;
