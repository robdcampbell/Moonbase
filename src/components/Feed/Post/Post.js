import React from "react";
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

  const deleteProject = (e) => {
    console.log(docId);
    const projectsRef = firestore
      .collection("users")
      .doc(params.id)
      .collection("projects");

    return projectsRef.doc(docId).delete();
  };

  return (
    <div className="post" key={id}>
      <div className="post__top">
        <div className="post__topInfo">
          <h2>{`${
            index < 10 ? `0${index + 1}` : `${index}`
          }: ${projectTitle}`}</h2>
          <h4>{`Project status: ${status}`}</h4>
          <h4>{`Deadline: ${deadline}`}</h4>
          <h4>{`Database ID: ${id}`}</h4>
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
        </div>
      </div>

      <div className="post__body">
        <h3>Project Description:</h3>
        <p>{description}</p>
      </div>

      <div className="post__options">
        <div className="post__option">
          <p>Update Progress</p>
        </div>
        <div className="post__option">
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
