import React from "react";

const ActivePost = ({ id, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{id}</p>
    </div>
  );
};

export default ActivePost;
