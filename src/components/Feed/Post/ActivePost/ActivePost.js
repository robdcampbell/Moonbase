import React, { useState, useRef } from "react";
import { firestore } from "../../../../firebase/config";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import "./ActivePost.css";
import DeleteModal from "../DeleteModal";

const ActivePost = ({
  projectCardTitle,
  projectDescription,
  projectDeadline,
  projectStatus,
  docId,
  activeProject,
  showProjectDetails,
  setShowProjectDetails,
  setActiveProject,
  setActiveTitleUpdate,
  setActiveDescriptionUpdate,
  setActiveDeadlineUpdate,
  setActiveStatusUpdate,
  activeTitleUpdate,
  activeDescriptionUpdate,
  activeDeadlineUpdate,
  activeStatusUpdate,
}) => {
  const params = useParams();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // EDIT PROJECT
  const updateProjectInfo = (e) => {
    setActiveProject({
      // title: projectCardTitle,
      // description: projectDescription,
      // deadline: projectDeadline,
      // status: projectStatus,
      // docId,
      title: activeTitleUpdate,
      description: activeDescriptionUpdate,
      deadline: activeDeadlineUpdate,
      status: activeStatusUpdate,
      //  docId,
    });

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(docId);

    return projectsRef.set(
      {
        docId,
        title: activeTitleUpdate,
        description: activeDescriptionUpdate,
        deadline: activeDeadlineUpdate,
        status: activeStatusUpdate,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  };

  const deleteProject = async () => {
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");
    setDeleteModal(false);

    return projectsRef.doc(docId).delete();
  };

  return (
    <section className="activePost__container">
      {deleteModal && (
        <DeleteModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          deleteProject={deleteProject}
          projectCardTitle={projectCardTitle}
        ></DeleteModal>
      )}
      <div className="active__header">
        <h4 className="active__title">{projectCardTitle}</h4>
        <div className="active__headerBottm">
          <p>Status: {projectStatus}</p>
          <p>Deadline: {projectDeadline}</p>
          <p>Description: {projectDescription}</p>
          <button
            className="edit__btnToggle"
            onClick={(e) => setToggleEdit(!toggleEdit)}
          >
            {toggleEdit ? "Show less" : "Edit Project"}
          </button>
        </div>
      </div>

      <div
        className={
          toggleEdit ? "active__editSection" : "active__editSection hidden"
        }
      >
        {/*  */}
        <label htmlFor="project-title">Edit Title</label>
        <input
          type="text"
          value={activeTitleUpdate}
          onChange={(e) => {
            setActiveTitleUpdate(e.target.value);
          }}
          onClick={(e) => setActiveTitleUpdate(projectCardTitle)}
          name="project-title"
          className="active__input"
        />

        <label htmlFor="project-description">Edit Project Description </label>
        <textarea
          name="project-description"
          rows="4"
          value={activeDescriptionUpdate}
          onChange={(e) => setActiveDescriptionUpdate(e.target.value)}
          type="text"
          onClick={(e) => setActiveDescriptionUpdate(projectDescription)}
          placeholder={projectDescription}
          className="active__textArea"
        />

        <div className="bottom__inputItems">
          <label htmlFor="project-status">Update Project Status</label>
          <input
            value={activeStatusUpdate}
            onChange={(e) => setActiveStatusUpdate(e.target.value)}
            onClick={(e) => setActiveStatusUpdate(projectStatus)}
            type="text"
            placeholder={activeStatusUpdate || "Project Status"}
            className="active__input"
          />

          <label htmlFor="project-deadline">Update Project Deadline</label>
          <input
            value={activeDeadlineUpdate}
            onChange={(e) => setActiveDeadlineUpdate(e.target.value)}
            type="text"
            placeholder={activeDeadlineUpdate || "No deadline set"}
            className="active__input"
          />
        </div>

        <div className="active__btn__section">
          <button
            className="gradient__btn"
            onClick={(e) => {
              updateProjectInfo();
            }}
          >
            Update Project Info
          </button>
          <button
            style={{ backgroundColor: "rgba(255, 0, 0, 0.6)", color: "#fff" }}
            onClick={(e) => {
              setDeleteModal(true);
            }}
          >
            Delete Project
          </button>
        </div>
      </div>
      {/* comments section*/}
    </section>
  );
};

export default ActivePost;
