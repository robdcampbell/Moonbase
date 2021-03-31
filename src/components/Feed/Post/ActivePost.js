import React, { useState } from "react";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useProjects } from "../../../context/ProjectsContext";
import DeleteModal from "./DeleteModal";
import ProjectCommentsFeed from "./ProjectCommentsFeed.js";

const ActivePost = () => {
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

  const params = useParams();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // SAVING PROJECT EDITS
  const updateProjectInfo = async (e) => {
    await setActiveProject({
      title: activeTitleUpdate,
      description: activeDescriptionUpdate,
      deadline: activeDeadlineUpdate,
      status: activeStatusUpdate,
    });

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(activeProject.docId);

    return projectsRef.set(
      {
        docId: activeProject.docId,
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

    return projectsRef.doc(activeProject.docId).delete();
  };

  return (
    <section className="activePost__container">
      {deleteModal && (
        <DeleteModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          deleteProject={deleteProject}
          projectCardTitle={activeProject.title}
        ></DeleteModal>
      )}
      <div className="active__header">
        <h4 className="active__title">{activeProject.title}</h4>
        <div className="active__headerBottm">
          <p>Status: {activeProject.status}</p>
          <p>Deadline: {activeProject.deadline}</p>
          <p>Description: {activeProject.description}</p>
          <button
            className="edit__btnToggle"
            onClick={(e) => setToggleEdit(!toggleEdit)}
          >
            {toggleEdit ? "Show less" : "Edit Project"}
          </button>
        </div>
      </div>

      {/* edit Project component */}
      <div
        className={
          toggleEdit ? "active__editSection" : "active__editSection hidden"
        }
      >
        <label htmlFor="project-title">Edit Title</label>
        <input
          type="text"
          value={activeTitleUpdate}
          onChange={(e) => {
            setActiveTitleUpdate(e.target.value);
          }}
          onClick={(e) => setActiveTitleUpdate(activeProject.title)}
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
          onClick={(e) => setActiveDescriptionUpdate(activeProject.description)}
          placeholder={activeProject.description}
          className="active__textArea"
        />

        <div className="bottom__inputItems">
          <label htmlFor="project-status">Update Project Status</label>
          <select
            name="project-status"
            onChange={(e) => setActiveStatusUpdate(e.target.value)}
          >
            <option value="In-Progress">In-Progress</option>
            <option value="Done">Done</option>
          </select>

          <label htmlFor="project-deadline">Update Project Deadline</label>
          <input
            value={activeDeadlineUpdate}
            onChange={(e) => setActiveDeadlineUpdate(e.target.value)}
            type=""
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
      <h4>Comments: {`${activeProject.title}, ID:${activeProject.docId} `}</h4>
      <ProjectCommentsFeed />
    </section>
  );
};

export default ActivePost;
