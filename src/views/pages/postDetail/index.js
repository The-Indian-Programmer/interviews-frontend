import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { isEmpty } from '../../../configs/Funtions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPostComment, getPostDetailsByPostId } from '../homepage/store';
import { isUserLoggedIn } from '../../../auth/utils';
import { useFormik } from 'formik';
import { VALIDATION_MESSAGES } from '../../../configs/Contants';
import * as Yup from 'yup';

const PostDetails = () => {

  /* Redux vars */
  const dispatch = useDispatch();
  const postDetails = useSelector(state => state.posts.selectedPost);
  const userData = useSelector(state => state.auth.userData);

  /* Routes Vars */
  const { postId } = useParams();



  const post = {
    _id: !isEmpty(postDetails) ? postDetails._id : "",
    postContent: !isEmpty(postDetails) ? postDetails.postContent : "",
    totalLikes: !isEmpty(postDetails) ? postDetails.likes ? postDetails.likes.length : 0 : 0,
    totalComments: !isEmpty(postDetails) ? postDetails.comments ? postDetails.comments.length : 0 : 0,
    comments: !isEmpty(postDetails) ? postDetails.comments ? postDetails.comments : [] : [],
    likes: !isEmpty(postDetails) ? postDetails.likes ? postDetails.likes : [] : [],
    files: !isEmpty(postDetails) ? postDetails.files ? postDetails.files : [] : [],
  };


  /* Settings for slider */
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  /* Function to get post data */
  const getPostData = () => {
    const bodyData = {
      postId: postId,
    }
    const apiRes = dispatch(getPostDetailsByPostId(bodyData));

  }

  /* Function to get data on mount */
  React.useEffect(() => {
    if (isEmpty(postId)) return
    getPostData();
  }, [postId]);


  // get total post likes
  const getTotalPostLikes = () => {
    let formattedNumber = post.totalLikes < 9 ? `0${post.totalLikes}` : `${post.totalLikes}`;
    return formattedNumber;
  }

  // get total post comments
  const getTotalPostComments = () => {
    let formattedNumber = post.totalComments < 9 ? `0${post.totalComments}` : `${post.totalComments}`;
    return formattedNumber;
  }

  // check if post is liked by user
  const isPostLikedByUser = () => {
    if (!isUserLoggedIn()) return false;

    let isLiked = false;
    if (!isEmpty(post.likes)) {
      const likeArr = post.likes.filter((like) => like._id == userData._id);
      if (likeArr.length > 0) {
        isLiked = true;
      }
    }
    return isLiked;
  }

  /* Formik */
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(VALIDATION_MESSAGES.required),
    }),
    onSubmit: (values) => {
      handleSubmitComment(values);
    }
  });


  /* Function to handle comment submit */
  const handleSubmitComment = async (values) => {
    let bodyData = {
      postId: post._id,
      comment: values.comment,
    }

    const apiRes = await dispatch(addPostComment(bodyData));
  }


  return (
    <React.Fragment>

      <div className="homepage mt-20 w-auto h-screen bg-black text-white mb-10">
        <div className="h-full px-2 py-2">
          <div className="container mx-auto border rounded shadow-lg mt-4">

            {/* Slilder */}
            <Slider {...settings}>
              {!isEmpty(post.files) &&
                post.files.map((file, fileIndex) => {
                  return file.type === "image" ? (
                    <img key={fileIndex} className="h-96 w-full" src={file.url} alt="Post" />
                  ) : (
                    <video key={fileIndex} autoPlay={true} controls={true} className="h-96 w-full">
                      <source src={file.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  );
                })}
            </Slider>


            <p className="mb-4 font-semibold px-3 mt-24">{post.postContent}</p>
            <div className="flex items-center justify-between mb-4 px-3">
              <button className="text-white" >
                {isPostLikedByUser() ? <i className="fas fa-heart text-red-500 fa-lg mr-2"></i> : <i className="far fa-heart fa-lg mr-2"></i>} {getTotalPostLikes()}{" "}
              </button>
              <button className="text-white" >
                <i className="far fa-comment fa-lg mr-2"></i> {getTotalPostComments()}{" "}
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className='text-black'>
              <div className="flex mx-3 mb-2 bg-white">
                <input
                  type="text"
                  name='comment'
                  placeholder="Add a comment..."
                  className="w-full p-2 border rounded bg-none focus:outline-none"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-none text-black rounded "
                >
                  <i className="fas fa-paper-plane text-2xl"></i>
                </button>
              </div>
              {formik.errors.comment && formik.touched.comment && <span className='text-red-500 px-4'>{formik.errors.comment}</span>}

            </form>
            <div className="mb-4 px-3 mt-10">
              <h3 className="text-lg font-semibold mb-2">Comments:</h3>
              <ul>
                {post.comments.map((item, index) => (
                  <li key={index}>{item.comment}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PostDetails