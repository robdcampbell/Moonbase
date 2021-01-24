import React, { useState, useEffect } from "react";
import "./MessageSender.css";
import { useSession } from "../../../firebase/UserProvider";
//"../firebase/UserProvider";
import { firestore } from "../../../firebase/config";
import { useParams } from "react-router-dom";
// import { useStateValue } from "../../Context/StateProvider";
// import db from "../../../firebase";
// import firebase from "firebase";

const MessageSender = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const params = useParams();
  const { user } = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");

    projectsRef.add({
      description: description,
      title: projectTitle,
      deadline: projectDeadline,
      status: "in-progress",
    });

    setDescription("");
    setProjectDeadline("");
    setProjectTitle("");
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <form>
          <label htmlFor="project-title">Project Title</label>
          <input
            name="project-title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            type="text"
            placeholder={`What's next ?`}
          />
          <label htmlFor="project-description">Project Description</label>
          <textarea
            name="project-description"
            value={description}
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder={`...`}
            className="project-description"
          />
          {/* <input
            name="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder={`How are we going to get from "a" to "b"... `}
          /> */}
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
        </form>
      </div>
      {/*       
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideoCamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
     */}
    </div>
  );
};

export default MessageSender;
