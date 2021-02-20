import React from "react";
import "./AddModal.css";

const AddModal = ({ setShowUpdateModal, handleSubmit }) => {
  return (
    <div className="addModal__container">
      <p>Ready to add this project?</p>
      <button
        type="button"
        className="addModal__btn"
        onClick={(e) => handleSubmit()}
      >
        Add Project
      </button>
      <button
        className="addModal__btn"
        onClick={(e) => setShowUpdateModal(false)}
      >
        Continue adding details
      </button>
    </div>
  );
};

export default AddModal;
