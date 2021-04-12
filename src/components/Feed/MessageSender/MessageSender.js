import React, { useState, useEffect, useRef } from "react";
// import "./MessageSender.css";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import AddModal from "./AddModal";

const MessageSender = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const params = useParams();
  const projectTitleRef = useRef(null);

  useEffect(() => {
    projectTitleRef.current.focus();
  }, []);

  const handleSubmit = () => {
    setShowUpdateModal(false);
    const docId = new Date().valueOf().toString();
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(docId);

    if (description !== "" && projectTitle !== "") {
      projectsRef.set({
        description: description,
        title: projectTitle,
        deadline: projectDeadline,
        status: "in-progress",
        timeStamp,
        docId: docId,
      });
      setDescription("");
      setProjectDeadline("");
      setProjectTitle("");
    } else {
      alert("Required Fields!");
    }
  };

  return (
    <>
      <div className="messageSender__wrapper">
        <form>
          <div className="sender__inputTitle">
            {showUpdateModal && (
              <AddModal
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                handleSubmit={handleSubmit}
              />
            )}
            <h3>Create a new project:</h3>
            <label htmlFor="project-title">Project Title *</label>
            <input
              name="project-title"
              className="sender__input"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              type="text"
              placeholder={`What's next ?`}
              ref={projectTitleRef}
              required
            />
            <label htmlFor="project-deadline">Project Deadline</label>
            <input
              name="project-deadline"
              className="sender__input"
              value={projectDeadline}
              onChange={(e) => setProjectDeadline(e.target.value)}
              type="text"
              placeholder="Deadline..."
            />
          </div>
          <div className="input__description ">
            <label htmlFor="project-description">Project Description *</label>
            <textarea
              name="project-description"
              value={description}
              rows="7"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder={`Project description...`}
              className="sender__input"
              required
            />
          </div>
          <button
            onClick={(e) => setShowUpdateModal((curr) => !curr)}
            type="button"
            className="gradient__btn add__projectBtn"
          >
            Add Project
          </button>
          <p>*Field is required.</p>
        </form>
      </div>
    </>
  );
};

export default MessageSender;
