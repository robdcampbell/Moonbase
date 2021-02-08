import React, { useState, useEffect, useRef } from "react";
//import "./MessageSender.css";
import "./Post.css";
import { useSession } from "../../../firebase/UserProvider";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";

const Post = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const params = useParams();
  const projectTitleRef = useRef(null);
  const { user } = useSession();

  useEffect(() => {
    projectTitleRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const timeCreation = new Date().valueOf().toString();

    // const projectsRef = firestore
    //   .collection("users")
    //   .doc(params.id)
    //   .collection("projects")
    //   .doc(timeCreation);

    // if (description !== "" && projectTitle !== "") {
    //   projectsRef.set({
    //     description: description,
    //     title: projectTitle,
    //     deadline: projectDeadline,
    //     status: "in-progress",
    //     docId: timeCreation,
    //   });
    // } else {
    //   alert("Required Fields!");
    // }

    setDescription("");
    setProjectDeadline("");
    setProjectTitle("");
  };

  return (
    <div className="post__card">
      <form>
        <label htmlFor="project-title" className="project__title">
          Project Title
        </label>
        <input
          name="project-title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          type="text"
          placeholder={`What's next ?`}
          ref={projectTitleRef}
          required
          className="edit__field"
        />
        <label htmlFor="project-description">Project Description *</label>
        <textarea
          name="project-description"
          value={description}
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder={``}
          className="project-description"
          required
        />
        <label htmlFor="project-deadline">Project Deadline</label>
        <input
          value={projectDeadline}
          onChange={(e) => setProjectDeadline(e.target.value)}
          type="text"
          placeholder="Deadline..."
          className="edit__field"
        />
        <button onClick={handleSubmit} type="submit">
          Edit Project
        </button>
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
