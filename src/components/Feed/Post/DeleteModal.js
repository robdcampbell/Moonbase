import React from "react";

const DeleteModal = ({ deleteProject, setDeleteModal, projectCardTitle }) => {
  return (
    <div className="delete__modal">
      <h3>{`Are you sure you want to delete " ${projectCardTitle} " ?`}</h3>
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
          style={{ backgroundColor: "rgba(255, 0, 0, 0.7)" }}
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
