import React from "react";
import { useProjects } from "../../../context/ProjectsContext";
import "./Post.css";

const Post = ({ description, deadline, title, status, docId }) => {
  const {
    setActiveProject,
    setShowProjectDetails,
    setActiveTitleUpdate,
    setActiveDescriptionUpdate,
    setActiveDeadlineUpdate,
    setActiveStatusUpdate,
  } = useProjects();

  const shorterTitle = () => {
    return title.toLowerCase().length > 22
      ? `${title.split("").slice(0, 20).join("")}...`
      : title;
  };

  return (
    <div
      className="post__card"
      onClick={(e) => {
        setShowProjectDetails((prevState) => !prevState);
        setActiveTitleUpdate(title);
        setActiveDescriptionUpdate(description);
        setActiveDeadlineUpdate(deadline);
        setActiveStatusUpdate(status);
        setActiveProject({
          title,
          description,
          deadline,
          status,
          docId,
        });
      }}
    >
      <div className="post__heading">
        <h4 className="project__title">{shorterTitle()}</h4>
        {/* <p>{deadline || "No deadline set."}</p> */}

        <button
          className="gradient__btn details__btn hidden"
          onClick={(e) => {
            setShowProjectDetails((prevState) => !prevState);
            setActiveProject({
              title,
              description,
              deadline,
              status,
              docId,
            });
          }}
        >
          View Project Details
        </button>
      </div>
    </div>
  );
};

export default Post;
