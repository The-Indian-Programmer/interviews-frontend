// src/components/Post.js
import React from "react";
import { useHistory } from "react-router-dom";

const Post = ({ splash, caption, postId }) => {

    const history = useHistory();


    const handlePostClick = () => {
        history.push(`/post/${postId}`);
    }
  return (
    <div role="button" onClick={handlePostClick} className="mx-4 my-4 col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
       <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {(splash && splash.type == 'image') ? (
          <img src={splash.url} alt="Post" className="w-full h-52" />
        ) : (splash && splash.type == 'video') ? (
            <video autoPlay={true} controls={false} className="w-full h-52">
                <source src={splash.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
          ) : (
          <div className="h-52 bg-gray-300">
            <p className="text-center text-gray-400 pt-12 text-3xl">
              No Image
            </p>
          </div> // Placeholder for missing image
        )}
        <div className="p-4">
          {caption ? (
            <p className="text-gray-700 text-base">{caption.length > 25 ? `${caption.substring(0, 25)}...`: caption}</p>
          ) : (
            <p className="text-gray-700 text-base">
              No image available, but here's a beautiful caption!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;