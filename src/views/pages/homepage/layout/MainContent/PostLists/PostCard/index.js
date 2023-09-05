import React from "react";
import { isEmpty } from "../../../../../../../configs/Funtions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { defaultAvatar } from "../../../../../../../configs/Contants";
import moment from "moment";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { isUserLoggedIn } from "../../../../../../../auth/utils";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const PostCard = ({
  post,
  selectedPost,
  handleSelectedPost,
  handleDelete,
  handlePostLikeDislike,
  handleEditPost,
}) => {
  /* Redux Vars */
  const userData = useSelector((state) => state.auth.userData);


  /* Routes vars */
  const history = useHistory();

  /* Local Vars */
  const timestamp = post.createdAt;
  const pastTime = moment(timestamp).format("MMM DD, hh:mm A");

  // Function to check if post likes by user
  const isPostLikedByUser = () => {
    let isLiked = false;
    if (!isEmpty(post.likes)) {
      if (isUserLoggedIn() && !isEmpty(userData)) {
        const likeArr = post.likes.filter((like) => like._id === userData._id);
        if (likeArr.length > 0) {
          isLiked = true;
        }
      }
    }
    return isLiked;
  };

  const newPost = {
    _id: post._id ? post._id : "",
    username: post.author
      ? post.author.username
        ? post.author.username
        : "Anonymous"
      : "Anonymous",
    userProfile: !isEmpty(post.author)
      ? !isEmpty(post.author.profilePicture)
        ? post.author.profilePicture
        : defaultAvatar
      : defaultAvatar,
    createdAt: post.createdAt ? pastTime : "2 hours ago",
    postContent: post.postContent ? post.postContent : "No caption",
    timeDuration: post.timeDuration ? post.timeDuration : "2 hours ago",
    authorId: post.author ? (post.author._id ? post.author._id : null) : null,
    likes: post.likes ? post.likes : [],
    totalComments: post.totalComments ? post.totalComments : [],
    isLiked: isPostLikedByUser(),
  };

  // const [postState, setPostState] = React.useState(newPost);

  /* Settings for slider */
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  /* Functions to handle post delete */
  const handlePostDelete = () => {
    Swal.fire({
      title: "Sure you want to delete?",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Yes Delete",
      confirmButtonColor: "#fc1100",
      denyButtonText: `No, Not now`,
      denyButtonColor: "#000000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        handleDelete(selectedPost);
      } else if (result.isDenied) {
        handleSelectedPost(null);
      }
    });
  };

  // Function to get the total number of likes
  const getTotalLikes = () => {
    let totalLikes = 0;
    if (!isEmpty(newPost.likes)) {
      totalLikes = newPost.likes.length;
    }
    let formattedNumber = totalLikes < 9 ? `0${totalLikes}` : `${totalLikes}`;
    return formattedNumber;
  };

  // Function to get the total number of comments
  const getTotalComments = () => {
    let totalComments = 0;
    totalComments = newPost.totalComments;
    let formattedNumber = totalComments < 9 ? `0${totalComments}` : `${totalComments}`;
    return formattedNumber;
  };

  const changesPostLikeStatus = () => {
    handlePostLikeDislike(newPost._id, isPostLikedByUser());

    // setPostState({
    //   ...postState,
    //   isLiked: !postState.isLiked,
    //   likes: !postState.isLiked ? [...postState.likes, {_id: userData._id}] : postState.likes.filter((like) => like._id !== userData._id),
    // });
  };


  const handleUserClick = () => {
    history.push(`/user/${newPost.authorId}`);
  }

  return (
    <div className=" bg-gray-950 rounded-xl shadow-md overflow-hidden mx-1 md:mx-1 sm:mx-0 lg:mx-1 xl:mx-2 mt-4">
      {/* Header */}
      <div className="bg-gray-950 p-4  flex items-center justify-between">
        <div className="flex items-center" role="button" onClick={handleUserClick}>
          <img
            className="w-12 h-12 rounded-full border p-1"
            src={newPost.userProfile}
            alt={`${newPost.username}'s profile`}
          />
          <div className="ml-2">
            <p className="text-lg font-semibold">{newPost.username}</p>
            <p className="text-sm text-white">{newPost.createdAt}</p>
          </div>
        </div>
        {userData._id == newPost.authorId && (
          <div className="relative">
            <i
              className="fa-solid fa-ellipsis-vertical text-white text-2xl cursor-pointer"
              onClick={() => handleSelectedPost(newPost._id)}
            ></i>

            {selectedPost == newPost._id && (
              <div className="flex flex-col absolute right-1 bg-gray-800 p-1 rounded-sm w-max z-10">
                <button onClick={() => handleEditPost(newPost._id)} className="w-max bg-gray-800 px-2 py-1">
                  <i className="fa-solid fa-pencil text-white text-sm w-auto mr-2"></i>
                  Edit
                </button>
                <button
                  className="w-max bg-gray-800 px-2 py-1"
                  onClick={() => handlePostDelete(newPost._id)}
                >
                  <i className="fa-solid fa-trash text-white text-sm w-auto mr-2"></i>
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <hr />

      <Link to={`/post/${newPost._id}`}>
      {/* Caption */}
      <div className="p-4">
        <p className="text-white">{newPost.postContent}</p>
      </div>

      {/* Media */}
      <Slider  {...settings}>
        {!isEmpty(post.files) &&
          post.files.map((file, fileIndex) => {
            return file.type === "image" ? (
              <img key={fileIndex} className="h-80 w-full" src={file.url} alt="Post" />
            ) : (
              <video key={fileIndex} autoPlay={true} controls={false} className="w-full h-80">
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          })}
      </Slider>
      
      </Link>
      {/* Likes and comments */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center"
            role="button"
            onClick={() => changesPostLikeStatus()}
          >
            {newPost.isLiked ? (
              <i className="fas fa-heart text-red-500 text-2xl mr-2"></i>
            ) : (
              <i className="far fa-heart text-white text-2xl mr-2"></i>
            )}
            <p className="text-sm text-white">{getTotalLikes()}</p>
          </div>
          <div role="button" className="flex items-center">
            <i className="far fa-comment text-white text-2xl mr-2"></i>
            <p className="text-sm text-white">{getTotalComments()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
