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
  setActiveProject,
}) => {
  const params = useParams();
  const [activeTitleUpdate, setActiveTitleUpdate] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const titleUpdateRef = useRef();

  // EDIT PROJECT
  const updateProjectInfo = (e) => {
    // Get current ProjectDoc Contents
    // Edit select ones
    // Re-set that doc
    setActiveProject({
      // title: projectCardTitle,
      // description: projectDescription,
      // deadline: projectDeadline,
      // status: projectStatus,
      // docId,
      title: titleUpdateRef.current.value,
      //  description,
      //  deadline,
      //  status,
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
        description: projectDescription,
        status: projectStatus,
        deadline: projectDeadline,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  };

  const deleteProject = async () => {
    console.log("PTERODACTYL");
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
            {toggleEdit ? "Show less" : "Edit Post"}
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
          ref={titleUpdateRef}
          value={activeTitleUpdate}
          onChange={(e) => {
            setActiveTitleUpdate(e.target.value);
            // e.target.value = "";
          }}
          placeholder={activeProject.title}
          name="project-title"
          // value={projectCardTitle}
          // onChange={(e) => setProjectCardTitle(e.target.value)}
          className="active__input"
        />

        <label htmlFor="project-description">Edit Project Description </label>
        <textarea
          name="project-description"
          rows="4"
          // value={projectDescription}
          // onChange={(e) => setProjectDescription(e.target.value)}
          type="text"
          placeholder={projectDescription}
          className="active__textArea"
        />

        <div className="bottom__inputItems">
          <label htmlFor="project-status">Update Project Status</label>
          <input
            // value={projectStatus}
            // onChange={(e) => setProjectStatus(e.target.value)}
            type="text"
            placeholder="Project Status"
            className="active__input"
          />

          <label htmlFor="project-deadline">Update Project Deadline</label>
          <input
            // value={projectDeadline ? projectDeadline : "(No deadline set)"}
            // onChange={(e) => setProjectDeadline(e.target.value)}
            type="text"
            placeholder="Deadline..."
            className="active__input"
          />
        </div>

        <div className="active__btn__section">
          <button
            className="gradient__btn"
            onClick={(e) => {
              updateProjectInfo();
              setActiveTitleUpdate("");
            }}
          >
            Update Project Info
          </button>
          <button
            className=""
            onClick={(e) => {
              setDeleteModal(true);
            }}
          >
            DELETE PROJECT
          </button>
        </div>
      </div>
      {/* comments section*/}
    </section>
  );
};

export default ActivePost;
