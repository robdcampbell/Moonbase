import React, { useState, useRef } from "react";
import { firestore } from "../../../../firebase/config";
import { useParams } from "react-router-dom";
import firebase from "firebase";

const ActivePost = ({
  projectCardTitle,
  projectDescription,
  projectDeadline,
  projectStatus,
  docId,
}) => {
  const params = useParams();
  const [activeTitleUpdate, setActiveTitleUpdate] = useState(projectCardTitle);
  const projectTitleUpdate = useRef();

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
        title: projectTitleUpdate.current.value,
        description: projectDescription,
        status: projectStatus,
        deadline: projectDeadline,
      },
      { merge: true }
    );
  };

  return (
    <div>
      <h3 style={{ color: "red" }}>{activeTitleUpdate}</h3>
      <p>{projectDescription}</p>
      <p>{projectDeadline}</p>
      <p>{projectStatus}</p>
      <p>{docId}</p>

      <input
        type="text"
        value={activeTitleUpdate}
        ref={projectTitleUpdate}
        onChange={(e) => setActiveTitleUpdate(e.target.value)}
        placeholder={projectCardTitle}
      />

      {/* updateProjectInfo() */}

      <button
        className="gradient__btn"
        onClick={(e) => console.log(projectTitleUpdate.current.value)}
      >
        Update Project{" "}
      </button>
      {/* comments section*/}
    </div>
  );
};

export default ActivePost;
