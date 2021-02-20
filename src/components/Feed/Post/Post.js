import React, { useEffect } from "react";
import "./Post.css";

const Post = ({
  id,
  description,
  deadline,
  title,
  status,
  index,
  docId,
  showProjectDetails,
  setShowProjectDetails,
  activeProject,
  setActiveProject,
  setActiveTitleUpdate,
  setActiveDescriptionUpdate,
  setActiveDeadlineUpdate,
  setActiveStatusUpdate,
}) => {
  //let shorterTitle = "TEST PP";

  const shorterTitle = () => {
    return title.toLowerCase().length > 20
      ? `${title.split("").slice(0, 20).join("")}...`
      : title;
  };

  useEffect(() => {
    console.log(title.slice(0, 5));
  }, []);

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
        <p>{deadline || "No deadline set."}</p>

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
