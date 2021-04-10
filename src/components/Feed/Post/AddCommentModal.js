import React from "react";

const AddCommentModal = ({ setShowUpdateModal, handleSubmit }) => {
  return (
    <div className="addModal__container">
      <p>Confirm: Add this update?</p>
      <button
        type="button"
        className="addModal__btn"
        onClick={(e) => handleSubmit()}
      >
        Add Project Comment
      </button>
      <button
        className="addModal__btn"
        onClick={(e) => setShowUpdateModal(false)}
      >
        Continue editing details
      </button>
    </div>
  );
};

export default AddCommentModal;
