import React, { useState, useEffect, useRef } from "react";
//import "./MessageSender.css";
import "./Post.css";
import { useSession } from "../../../firebase/UserProvider";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";

const Post = ({
  id,
  description,
  deadline,
  projectTitle,
  status,
  index,
  docId,
}) => {
  const [projectCardTitle, setProjectCardTitle] = useState(projectTitle);
  const [projectDescription, setProjectDescription] = useState(description);
  const [projectDeadline, setProjectDeadline] = useState(deadline);
  const [projectStatus, setProjectStatus] = useState(status);
  const params = useParams();
  const projectTitleRef = useRef(null);
  const { user } = useSession();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    projectTitleRef.current.focus();
  }, []);

  // EDIT PROJECT
  const updateProjectInfo = (e) => {
    console.log(docId);
    console.log(projectDescription);
    console.log(projectDeadline);
    console.log(projectStatus);
    console.log(projectCardTitle);
    // Get current ProjectDoc Contents
    // Edit select ones
    // Re-set that doc

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(docId);

    // const newDescription = window.prompt(
    //   `Edit Project Description: ${projectTitle}?`,
    //   `${description}`
    // );

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

  return (
    <div className="post__card">
      <div className="post__heading">
        <h4 className="project__title">{projectTitle}</h4>
      </div>

      <form>
        {deleteModal && (
          <div className="delete__modal">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="delete__modalButtons">
              <button
                onClick={(e) => {
                  return setDeleteModal(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  return deleteProject();
                }}
                type="button"
              >
                Delete Project
              </button>
            </div>
          </div>
        )}

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
            // <div className="update__modal">
            <>
              <h4>Are you sure?</h4>

              <button
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
            //</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Post;

// OLD POST

// import React, { useState, useRef } from "react";
// import { firestore } from "../../../firebase/config";
// import { useParams } from "react-router-dom";
// import "./Post.css";

// // {new Date(timestamp?.toDate()).toUTCString()}
// /*const testImg =
//   "https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/08/detroit_red_wings_logo-58b8da213df78c353c2346cb.jpg?w=1000&h=600&crop=1";
// */

// const Post = ({
//   id,
//   description,
//   deadline,
//   projectTitle,
//   status,
//   index,
//   docId,
// }) => {
//   const params = useParams();
//   const [editingProject, setEditingProject] = useState(false);
//   const descriptionRef = useRef();

//   // EDIT PROJECT - start with window prompt, then add Semantic UI modal later.
//   const editProjectPost = (e) => {
//     e.preventDefault();
//     // Get current ProjectDoc Contents
//     // Edit select ones
//     // Re-set that doc
//     setEditingProject(!editingProject);
//     /*
//     const projectsRef = firestore
//       .collection("users")
//       .doc(params.id)
//       .collection("projects")
//       .doc(docId);

//     const newDescription = window.prompt(
//       `Edit Project Description: ${projectTitle}?`,
//       `${description}`
//     );

//     if (newDescription) {
//       projectsRef.set({ docId, description: newDescription }, { merge: true });
//     }
//   */
//   };

//   //  DELETE PROJECT
//   const deleteProject = (e) => {
//     let userPreference;

//     if (
//       window.confirm(`Are you sure you want to delete "${projectTitle}" ?`) ==
//       true
//     ) {
//       userPreference = "Project deleted!";

//       const projectsRef = firestore
//         .collection("users")
//         .doc(params.id)
//         .collection("projects");

//       return projectsRef.doc(docId).delete();
//     } else {
//       userPreference = "Project not deleted";
//     }
//   };

//   return (
//     <div className="post" key={docId}>
//       <div className="post__top">
//         <div className="post__topInfo">
//           <h2>{`${
//             index < 10 ? `0${index + 1}` : `${index}`
//           }: ${projectTitle}`}</h2>
//           <h4>{`Project status: ${status}`}</h4>
//           <h4>{`Deadline: ${deadline}`}</h4>
//           {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
//         </div>
//       </div>

//       <div
//         className={editingProject ? "post__body editing__body" : "post__body"}
//         // style={
//         //   editingProject
//         //     ? { backgroundColor: "rgba(173, 216, 230, 0.3)" }
//         //     : { backgroundColor: "transparent" }
//         // }
//       >
//         <h3>
//           {editingProject ? "Edit Description..." : `Project Description:`}
//         </h3>
//         <input
//           placeholder={editingProject ? "EDITNG...." : description}
//         ></input>
//       </div>

//       <div className="post__options">
//         {/* <div className="post__option">
//           <p>Comments</p>
//         </div> */}
//         <div className="post__option">
//           <p>Update Progress</p>
//         </div>
//         <div className="post__option" onClick={editProjectPost}>
//           <p>Edit Project</p>
//         </div>
//         <div className="post__option" onClick={deleteProject}>
//           <p>Delete</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;
