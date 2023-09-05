import React from "react";
import Post from "./PostCard";



const PostGallery = ({posts}) => {


    const newPosts = posts.map((post) => {
        let splash = post.files[0] ? post.files[0] : null;

        return {
          postId: post._id,
          splash: splash ? splash : null,
          caption: post.postContent ? post.postContent : null,
        };
    })
    
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        {newPosts.map((post, index) => (
          <Post key={index} postId={post.postId} splash={post.splash} caption={post.caption} />
        ))}
      </div>
    </div>
  );
};

export default PostGallery;