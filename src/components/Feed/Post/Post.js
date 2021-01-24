import React from "react";

import "./Post.css";

// {new Date(timestamp?.toDate()).toUTCString()}
/*const testImg =
  "https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/08/detroit_red_wings_logo-58b8da213df78c353c2346cb.jpg?w=1000&h=600&crop=1";
*/

const Post = ({ id, description, deadline }) => {
  //console.log(profilePic, image, username, timestamp, message);

  return (
    <div className="post">
      <div className="post__top">
        <div className="post__topInfo">
          <h2>{`Project Title: ${`Project_Title`}`}</h2>
          <h4>{`Project status: ${`in-progress`}`}</h4>
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
        <div className="post__option">
          <p>Delete</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
