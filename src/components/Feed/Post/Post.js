import React, { useState, useRef } from "react";
import "./Post.css";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

const Post = ({
  id,
  description,
  deadline,
  projectTitle,
  status,
  index,
  docId,
  showProjectDetails,
  setShowProjectDetails,
  activeProject,
  setActiveProject,
}) => {
  const params = useParams();
  const projectTitleRef = useRef(null);
  //const { user } = useSession();
  const [projectCardTitle, setProjectCardTitle] = useState(projectTitle);
  const [projectDescription, setProjectDescription] = useState(description);
  const [projectDeadline, setProjectDeadline] = useState(deadline);
  const [projectStatus, setProjectStatus] = useState(status);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const expandDetails = () => {
    if (activeProject) {
      console.log(docId);
    }
  };

  // EDIT PROJECT
  const updateProjectInfo = (e) => {
    // Get current ProjectDoc Contents
    // Edit select ones
    // Re-set that doc

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(docId);

    return projectsRef.set(
      {
        docId,
        title: projectCardTitle,
        description: projectDescription,
        status: projectStatus,
        deadline: projectDeadline,
      },
      { merge: true }
    );

    /*
    const timeCreation = new Date().valueOf().toString();

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(timeCreation);

    projectsRef.set({
      description: description,
      title: projectTitle,
      deadline: projectDeadline,
      status: "in-progress",
      docId: timeCreation,
    });

    console.log(`Pterodactyl : ${projectCardTitle}`);
  };
*/
  };
  //  DELETE PROJECT
  const deleteProject = async () => {
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");

    return projectsRef.doc(docId).delete();
  };

  // ROUTE TO PROJECT PAGE

  return (
    <div className="post__card">
      <div className="post__heading">
        <h4 className="project__title">{projectTitle}</h4>
        <p>{deadline || "No deadline set."}</p>

        <button
          className="gradient__btn details__btn"
          onClick={(e) => {
            setShowProjectDetails((prevState) => !prevState);
            setActiveProject({
              projectCardTitle,
              projectDescription,
              projectDeadline,
              projectStatus,
              docId,
            });
            return expandDetails();
          }}
        >
          View Project Details
        </button>
      </div>

      <form>
        {deleteModal && (
          <DeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            deleteProject={deleteProject}
            projectCardTitle={projectCardTitle}
          ></DeleteModal>
        )}

        <div
          className={"form__body hidden"}
          // className={
          //   showProjectDetails && docId ? "form__body" : "form__body hidden"
          // }
        >
          <label htmlFor="project-title">Edit Title</label>
          <input
            name="project-title"
            value={projectCardTitle}
            onChange={(e) => setProjectCardTitle(e.target.value)}
            type="text"
            placeholder={`What's next ?`}
            ref={projectTitleRef}
            className="edit__field"
          />

          <label htmlFor="project-description">Edit Project Description </label>
          <textarea
            name="project-description"
            value={projectDescription}
            rows="4"
            onChange={(e) => setProjectDescription(e.target.value)}
            type="text"
            placeholder={projectDescription}
            className="project-description"
          />

          <div className="bottom__inputItems">
            <label htmlFor="project-status">Update Project Status</label>
            <input
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              type="text"
              placeholder="Project Status"
              className="edit__field"
            />

            <label htmlFor="project-deadline">Update Project Deadline</label>
            <input
              value={projectDeadline ? projectDeadline : "(No deadline set)"}
              onChange={(e) => setProjectDeadline(e.target.value)}
              type="text"
              placeholder="Deadline..."
              className="edit__field"
            />
          </div>

          <div className="post__cardButtons">
            {!updateModal ? (
              <>
                <h4>::</h4>
                <button onClick={(e) => setUpdateModal(true)} type="button">
                  Update Project Details
                </button>

                <button
                  onClick={(e) => {
                    setDeleteModal(true);
                  }}
                  type="button"
                >
                  Delete Project
                </button>
              </>
            ) : (
              <>
                <h4>Are you sure?</h4>

                <button
                  style={{
                    backgroundColor: "rgba(255,255,255,.7)",
                    color: "#292929",
                  }}
                  onClick={(e) => {
                    setUpdateModal(false);
                    return updateProjectInfo();
                  }}
                  type="button"
                >
                  Save Project Edits
                </button>

                <button
                  onClick={(e) => {
                    return setUpdateModal(false);
                  }}
                  type="button"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Post;
