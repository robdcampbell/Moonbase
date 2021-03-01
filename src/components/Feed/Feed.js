import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../../firebase/UserProvider";
import { useProjects } from "../../context/ProjectsContext";
import { firestore } from "../../firebase/config";
import MessageSender from "./MessageSender/MessageSender";
import ActivePost from "./Post/ActivePost/ActivePost";
import Post from "./Post/Post";
import "./Feed.css";

const Feed = ({ userName }) => {
  const { user } = useSession();
  const params = useParams();

  const {
    userProjects,
    setUserProjects,
    activeProject,
    setActiveProject,
    showProjectDetails,
    setShowProjectDetails,
    activeTitleUpdate,
    setActiveTitleUpdate,
    activeDescriptionUpdate,
    setActiveDescriptionUpdate,
    activeDeadlineUpdate,
    setActiveDeadlineUpdate,
    activeStatusUpdate,
    setActiveStatusUpdate,
  } = useProjects();

  // LOAD PROJECTS LIST/SIDEBAR *****************************
  useEffect(() => {
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .orderBy("timeStamp", "desc");

    const unsubscribe = projectsRef.onSnapshot((querySnapshot) => {
      const projects = querySnapshot.docs.map((doc) => doc.data());
      setUserProjects(projects);
      setActiveProject(projects[0]);
      setActiveTitleUpdate(projects[0].title);
      setActiveDescriptionUpdate(projects[0].description);
      setActiveStatusUpdate(projects[0].status);
      setActiveDeadlineUpdate(projects[0].deadline);
    });
    return unsubscribe;
  }, [user.uid, params.id]);

  return (
    <div className="feed">
      {/* <div className="welcome__heading">
        <h3 className="user__welcomeHeading" style={{ textAlign: "left" }}>
          Welcome, {userName}.
        </h3>
      </div> */}

      {/* 
      <MessageSender />

      <div className="projectsSection__header">
        <h2 className="projects__heading">Projects Dashboard.</h2>
      </div>
         */}

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
                    description={description}
                    deadline={deadline}
                    title={title}
                    status={status}
                    docId={docId}
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
    </div>
  );
};

export default Feed;
