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

    let minutes = commentDate.getMinutes();
    let hours = commentDate.getHours();
    let time = commentDate.toLocaleTimeString();

    const month = commentDate.getMonth();
    const date = commentDate.getDate();
    const year = commentDate.getFullYear();
    const fullDate = `${time} - ${month}/${date}/${year}`;
    setCommentTime(fullDate);
  };

  useEffect(() => {
    getTime();
  }, []);

  return (
    <section className="comment_container">
      <h4>Update: {index + 1}</h4>
      <p>{comment.description}</p>
      <p>{`Added: ${commentTime}`}</p>
      <button>...</button>
      <button>delete</button>
    </section>
  );
};

export default ProjectCommentsFeed;
