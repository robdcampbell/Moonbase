import React, { useState, useRef } from "react";
import "./Post.css";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import firebase from "firebase";

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
}) => {
  const params = useParams();
  const projectTitleRef = useRef(null);
  //const { user } = useSession();
  const [projectCardTitle, setProjectCardTitle] = useState(title);
  const [projectDescription, setProjectDescription] = useState(description);
  const [projectDeadline, setProjectDeadline] = useState(deadline);
  const [projectStatus, setProjectStatus] = useState(status);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // const expandDetails = () => {
  //   if (activeProject) {
  //     console.log(docId);
  //   }
  // };

  const updateProjectInfo = (e) => {
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

    return projectsRef.doc(docId).delete();
  };

  return (
    <div
      className="post__card"
      onClick={(e) => {
        setShowProjectDetails((prevState) => !prevState);
        setActiveProject({
          title,
          description,
          deadline,
          status,
          docId,
        });
        // return expandDetails();
      }}
    >
      <div className="post__heading">
        <h4 className="project__title">{title}</h4>
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
            // return expandDetails();
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

        <div className={"form__body hidden"}>
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
