import React, { useState } from "react";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import "./Post.css";

// {new Date(timestamp?.toDate()).toUTCString()}
/*const testImg =
  "https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/08/detroit_red_wings_logo-58b8da213df78c353c2346cb.jpg?w=1000&h=600&crop=1";
*/

const Post = ({
  id,
  description,
  deadline,
  projectTitle,
  status,
  index,
  docId,
}) => {
  const params = useParams();
  const [editProject, setEditProject] = useState({
    docId: null,
    description: "",
    status: "in-progress",
  });

  // EDIT PROJECT - start with window prompt, then add Semantic UI modal later.
  const editProjectPost = (e) => {
    e.preventDefault();
    // Get current ProjectDoc Contents
    // Edit select ones
    // Re-set that doc

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(docId);

    const newDescription = window.prompt(
      `Edit Project Description: ${projectTitle}?`,
      `${description}`
    );

    if (newDescription) {
      projectsRef.set({ docId, description: newDescription }, { merge: true });
    }
  };

  //  DELETE PROJECT
  const deleteProject = (e) => {
    let userPreference;

    if (
      window.confirm(`Are you sure you want to delete "${projectTitle}" ?`) ==
      true
    ) {
      userPreference = "Project deleted!";

      const projectsRef = firestore
        .collection("users")
        .doc(params.id)
        .collection("projects");

      return projectsRef.doc(docId).delete();
    } else {
      userPreference = "Project not deleted";
    }

    // EDIT PROJECT Description (and deadline?)
  };

  return (
    <div className="post" key={docId}>
      <div className="post__top">
        <div className="post__topInfo">
          <h2>{`${
            index < 10 ? `0${index + 1}` : `${index}`
          }: ${projectTitle}`}</h2>
          <h4>{`Project status: ${status}`}</h4>
          <h4>{`Deadline: ${deadline}`}</h4>
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
        </div>
      </div>

      <div className="post__body">
        <h3>Project Description:</h3>
        <p>{description}</p>
      </div>

      <div className="post__options">
        <div className="post__option">
          <p>Comments</p>
        </div>
        <div className="post__option">
          <p>Update Progress</p>
        </div>
        <div className="post__option" onClick={editProjectPost}>
          <p>Edit Project</p>
        </div>
        <div className="post__option" onClick={deleteProject}>
          <p>Delete</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
