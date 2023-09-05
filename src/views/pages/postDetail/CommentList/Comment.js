import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Comment = ({ comment, handleEdit, handleDelete }) => {

  /* Redux Vars */
  const user = useSelector((state) => state.auth.userData);


  /* Routes vars */
  const history = useHistory();


  /* Function to hanle user click */
  const handleUserClick = () => {
    history.push(`/user/${comment.userId}`);
  }
  return (
    <div className="border-b pb-4 mt-2">
      <div className="mb-4  pb-2 flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={comment.userProfile}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold" role="button" onClick={handleUserClick}>{comment.username}</h2>
            <h2 className="text-sm font-normal">{comment.name}</h2>
          </div>
        </div>

        {/* // Todo: handle comment edit and delete */}
        {false && (comment.userId == user._id) && <div className="mt-2 flex items-center">
          <button
            onClick={() => handleEdit(comment)}
            className="mr-2 text-gray-600 hover:text-gray-900"
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button
            onClick={() => handleDelete(comment)}
            className="text-red-600 hover:text-red-800"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>}
      </div>
      <p className="break-all ">{comment.comment}</p>
    </div>
  );
};

export default Comment;
