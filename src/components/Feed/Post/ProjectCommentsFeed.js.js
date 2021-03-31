import React from "react";
import { useProjects } from "../../../context/ProjectsContext";

const ProjectCommentsFeed = () => {
  const {
    activeProject,
    setActiveProject,
    activeTitleUpdate,
    setActiveTitleUpdate,
    activeDescriptionUpdate,
    setActiveDescriptionUpdate,
    activeDeadlineUpdate,
    setActiveDeadlineUpdate,
    activeStatusUpdate,
    setActiveStatusUpdate,
  } = useProjects();
  return (
    <div>
      <h2>Comments Feed for Active Project: {activeProject.docId}</h2>
    </div>
  );
};

export default ProjectCommentsFeed;
