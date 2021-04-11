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
    <section class="comment_container">
      <h4>Update: {index + 1}</h4>
      <p>{comment.description}</p>
      <p>{JSON.stringify(comment.timeStamp)}</p>
      <button>...</button>
      <button>delete</button>
    </section>
  );
};

export default ProjectCommentsFeed;
