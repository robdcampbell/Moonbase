import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Feed.css";
import MessageSender from "./MessageSender/MessageSender";
import Post from "./Post/Post";
import { useSession } from "../../firebase/UserProvider";
import { firestore } from "../../firebase/config";
import ActivePost from "./Post/ActivePost/ActivePost";

const Feed = ({ userName }) => {
  const { user } = useSession();
  const [userProjects, setUserProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("");
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const params = useParams();

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
    // create a Firebase Document Reference to specific project from a user

    /*
      //ACTIVE POST
                  const activeProjectRef = firestore
                    .collection("users")
                    .doc(params.id)
                    .collection("projects")
                    .doc(activeProject);

                  //Listen for realtime changes
                  // projectsRef.onSnapshot((querySnapshot) => {
                  //   querySnapshot.docs.map((doc) => console.log(doc));
                  // });

                  const unsubscribe = activeProjectRef.onSnapshot((querySnapshot) => {
                    const project = querySnapshot.data();
                    console.log(project);
                    setUserProjects([...project]);
                  });
                  return unsubscribe;
      */
    // ON PAGE LOADING

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");

    //Listen for realtime changes
    // projectsRef.onSnapshot((querySnapshot) => {
    //   querySnapshot.docs.map((doc) => console.log(doc));
    // });

    //console.log(projectsRef);

    const unsubscribe = projectsRef.onSnapshot((querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());
      setUserProjects(projects);
    });
    return unsubscribe;
  }, [user.uid, activeProject, params.id]);

  const testProjectRef = () => {
    console.log(activeProject.toString());
  };

  return (
    <div className="feed">
      <h3 className="user__welcomeHeading" style={{ textAlign: "left" }}>
        Welcome, {userName}.
      </h3>
      <h2 className="add__heading">Create a new project:</h2>
      <MessageSender />
      <h2 className="projects__heading">{`Projects Dashboard:`}</h2>

      {/* description, id, deadline */}
      <div className="dashboard">
        {/* <div className={showProjectDetails ? "dashboard__active" : "dashboard"}> */}
        {!activeProject ? (
          userProjects.map((project, index) => {
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
                showProjectDetails={showProjectDetails}
                setShowProjectDetails={setShowProjectDetails}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
              />
            );
          })
        ) : (
          <>
            <ActivePost
              key={userProjects.docId}
              id={userProjects.docId}
              title={userProjects.title}
            />
            {/* setActiveProject(false) */}
            <button
              type="button"
              onClick={(e) => {
                setActiveProject("");
              }}
            >
              reload.
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
