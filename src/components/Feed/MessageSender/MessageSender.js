import React, { useState, useEffect, useRef } from "react";
import "./MessageSender.css";
//import { useSession } from "../../../firebase/UserProvider";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import firebase from "firebase";

const MessageSender = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const params = useParams();
  const projectTitleRef = useRef(null);
  // const { user } = useSession();

  useEffect(() => {
    projectTitleRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const docId = new Date().valueOf().toString();
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects")
      .doc(docId);

    if (description !== "" && projectTitle !== "") {
      projectsRef.set({
        description: description,
        title: projectTitle,
        deadline: projectDeadline,
        status: "in-progress",
        timeStamp,
        docId: docId,
      });
      setDescription("");
      setProjectDeadline("");
      setProjectTitle("");
    } else {
      alert("Required Fields!");
    }
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <form>
          <div className="input__left form__input">
            <label htmlFor="project-title">Project Title *</label>
            <input
              name="project-title"
              className=""
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
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder={``}
              className="project-description"
              required
            />
          </div>

          <div className="input__right form__input">
            <label htmlFor="project-deadline">Project Deadline</label>
            <input
              value={projectDeadline}
              onChange={(e) => setProjectDeadline(e.target.value)}
              type="text"
              placeholder="Deadline..."
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="gradient__btn"
          >
            Add Project
          </button>
          <p>*Field is required.</p>
        </form>
      </div>
    </div>
  );
};

export default MessageSender;

/*
return (
    <div className="messageSender">
      <div className="messageSender__top">
        <form>
          <label htmlFor="project-title">Project Title *</label>
          <input
            name="project-title"
            className=""
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
*/
