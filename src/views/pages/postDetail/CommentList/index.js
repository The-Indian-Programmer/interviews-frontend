import React from "react";
import Comment from "./Comment";
const CommentList = ({ comments, handleEdit, handleDelete }) => {

  return (
    <div className="p-4 shadow-md rounded-lg">
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} handleDelete={handleDelete} handleEdit={handleEdit}/>
      ))}
    </div>
  );
};

export default CommentList;
