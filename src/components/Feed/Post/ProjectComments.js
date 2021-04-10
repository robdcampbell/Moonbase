import React from "react";
import { useProjects } from "../../../context/ProjectsContext";

const ProjectCommentsFeed = ({ comment, index }) => {
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
      <h4>Comment: {index + 1}</h4>
      <p>{comment.description}</p>
      <p>{JSON.stringify(comment.timeStamp)}</p>
    </div>
  );
};

export default ProjectCommentsFeed;
