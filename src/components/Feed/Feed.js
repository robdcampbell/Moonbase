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

  // active post state:
  const [activeTitleUpdate, setActiveTitleUpdate] = useState("");
  const [activeDescriptionUpdate, setActiveDescriptionUpdate] = useState("");
  const [activeDeadlineUpdate, setActiveDeadlineUpdate] = useState("");
  const [activeStatusUpdate, setActiveStatusUpdate] = useState("");

  // LOAD PROJECTS LIST/SIDEBAR *****************************
  //
  useEffect(() => {
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .orderBy("timeStamp", "desc");

    //Listen for realtime changes
    // projectsRef.onSnapshot((querySnapshot) => {
    //   querySnapshot.docs.map((doc) => console.log(doc));
    // });

    const unsubscribe = projectsRef.onSnapshot((querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());
      setUserProjects(projects);
      setActiveProject(projects[0]);
    });
    return unsubscribe;
  }, [user.uid, params.id]);

  return (
    <div className="feed">
      <h3 className="user__welcomeHeading" style={{ textAlign: "left" }}>
        Welcome, {userName}.
      </h3>
      <h2 className="add__heading">Create a new project:</h2>
      <MessageSender />
      <h2 className="projects__heading">{`Projects Dashboard:`}</h2>

      <div className="feed__bottom">
        <div className="feed__sidebar">
          <div className="dashboard">
            {userProjects &&
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
                    title={title}
                    status={status}
                    docId={docId}
                    showProjectDetails={showProjectDetails}
                    setShowProjectDetails={setShowProjectDetails}
                    activeProject={activeProject}
                    setActiveProject={setActiveProject}
                    setActiveTitleUpdate={setActiveTitleUpdate}
                    setActiveDescriptionUpdate={setActiveDescriptionUpdate}
                    setActiveDeadlineUpdate={setActiveDeadlineUpdate}
                    setActiveStatusUpdate={setActiveStatusUpdate}
                  />
                );
              })}
          </div>
        </div>

        <div className="feed__body">
          {activeProject ? (
            <>
              <ActivePost
                docId={activeProject.docId}
                projectCardTitle={activeProject.title}
                projectDescription={activeProject.description}
                projectDeadline={activeProject.deadline}
                projectStatus={activeProject.status}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                activeTitleUpdate={activeTitleUpdate}
                setActiveTitleUpdate={setActiveTitleUpdate}
                activeDescriptionUpdate={activeDescriptionUpdate}
                setActiveDescriptionUpdate={setActiveDescriptionUpdate}
                activeDeadlineUpdate={activeDeadlineUpdate}
                setActiveDeadlineUpdate={setActiveDeadlineUpdate}
                activeStatusUpdate={activeStatusUpdate}
                setActiveStatusUpdate={setActiveStatusUpdate}
              />
            </>
          ) : (
            <h4>Time to start a project.</h4>
          )}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Feed;
