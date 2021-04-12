import React, { useEffect, useState } from "react";
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

  const [commentTime, setCommentTime] = useState("TIME");

  const getTime = () => {
    let seconds = comment.timeStamp.seconds;
    let commentDate = new Date(null);
    commentDate.setTime(Number(seconds) * 1000);
    console.log(commentDate);
    setCommentTime(commentDate);
  };

  useEffect(() => {
    getTime();
  }, []);

  return (
    <section className="comment_container">
      <h4>Update: {index + 1}</h4>
      <p>{comment.description}</p>
      <p>{`Updated: ${commentTime}`}</p>
      <button>...</button>
      <button>delete</button>
    </section>
  );
};

export default ProjectCommentsFeed;
