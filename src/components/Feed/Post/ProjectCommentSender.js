import React, { useState } from "react";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import AddCommentModal from "./AddCommentModal";
import { useProjects } from "../../../context/ProjectsContext";

const ProjectCommentSender = () => {
  const {
    activeProject,
    // setActiveProject,
    // activeTitleUpdate,
    // setActiveTitleUpdate,
    // activeDescriptionUpdate,
    // setActiveDescriptionUpdate,
    // activeDeadlineUpdate,
    // setActiveDeadlineUpdate,
    // activeStatusUpdate,
    // setActiveStatusUpdate,
  } = useProjects();

  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const params = useParams();

  const handleSubmit = async () => {
    console.log(description);
    setShowUpdateModal(false);
    const commentId = new Date().valueOf().toString();
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

    const commentsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(activeProject.docId)
      .collection("comments")
      .doc(commentId);

    if (description !== "") {
      await commentsRef.set({
        description: description,
        title: activeProject.title,
        timeStamp,
        commentId,
      });
      setDescription("");
      setProjectDeadline("");
      setProjectTitle("");
    } else {
      alert("Must add project note!");
    }
  };

  return (
    <>
      <div className="messageSender__wrapper">
        <form>
          <div className="sender__inputTitle">
            {showUpdateModal && (
              <AddCommentModal
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
          <div className="input__description ">
            <label htmlFor="project-description">New Project note:</label>
            <textarea
              name="project-description"
              value={description}
              rows="7"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder={`Project update...`}
              className="sender__input"
              required
            />
          </div>
          <button
            onClick={(e) => setShowUpdateModal((curr) => !curr)}
            type="button"
            className="gradient__btn add__projectBtn"
          >
            Add Project Note
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectCommentSender;
