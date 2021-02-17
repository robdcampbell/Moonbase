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

  //ACTIVE POST *****************************
  useEffect(() => {
    // ORDERING POST BY TIMESTAMP, aka most recent. come back to this and use to update docID and updateProject function
    // db.collection("posts")
    //   .orderBy("timestamp", "desc")
    //   .onSnapshot((snapshot) =>
    //     setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    //   );
  }, [activeProject]);

  //User PROJECTS Collection (come back to after viewing how to display all Users from a collection)
  // POST SIDEBAR *****************************
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
      .collection("projects")
      .orderBy("timeStamp", "desc");

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
  }, [user.uid, params.id]);

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

      <div className="feed__bottom">
        <div className="feed__sidebar">
          <div
            className="dashboard"
            style={{
              // maxWidth: "300px",
              borderRight: "#c0c0c0 solid 1px",
              paddingRight: "2rem",
            }}
          >
            {/* <div className={showProjectDetails ? "dashboard__active" : "dashboard"}> */}
            {/*  */}
            {userProjects.map((project, index) => {
              const {
                id,
                description,
                deadline,
                title,
                status,
                docId,
              } = project;

              {
                // index === 0 ? " " : "";
              }

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
            })}
            {/* {!activeProject ? (
              userProjects.map((project, index) => {
                const {
                  id,
                  description,
                  deadline,
                  title,
                  status,
                  docId,
                } = project;

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
                
                <button
                  type="button"
                  onClick={(e) => {
                    setActiveProject("");
                  }}
                >
                  reload.
                </button>
              </>
            )} */}
            {/*  */}
          </div>
        </div>
        <div className="feed__body">
          <div className="feed__card">
            {activeProject ? (
              <>
                <ActivePost
                  docId={activeProject.docId}
                  projectCardTitle={activeProject.projectCardTitle}
                  projectDescription={activeProject.projectDescription}
                  projectDeadline={activeProject.projectDeadline}
                  projectStatus={activeProject.projectStatus}
                />
              </>
            ) : (
              <h4>not................!!!</h4>
            )}
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Feed;
