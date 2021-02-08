import React, { useState, useEffect, useRef } from "react";
import "./MessageSender.css";
import { useSession } from "../../../firebase/UserProvider";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";

const MessageSender = () => {
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

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(timeCreation);

    if (description !== "" && projectTitle !== "") {
      projectsRef.set({
        description: description,
        title: projectTitle,
        deadline: projectDeadline,
        status: "in-progress",
        docId: timeCreation,
      });
    } else {
      alert("Required Fields!");
    }

    setDescription("");
    setProjectDeadline("");
    setProjectTitle("");
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <form>
          <label htmlFor="project-title">Project Title *</label>
          <input
            name="project-title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            type="text"
            placeholder={`What's next ?`}
            ref={projectTitleRef}
            required
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
          />
          <button onClick={handleSubmit} type="submit">
            Add Project
          </button>
          <p>*Field is required.</p>
        </form>
      </div>
    </div>
  );
};

export default MessageSender;
