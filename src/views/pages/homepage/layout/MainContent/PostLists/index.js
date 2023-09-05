import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePostMessage from "./CreatePostMessage";
import { isEmpty } from "../../../../../../configs/Funtions";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import { getPostById, getPostsList, handlePostDelete, handleUpdatePost, updatePostLikeDislike, updatePostList } from "../../../layout/MainContent/store/index";
import { toast } from "react-toastify";
import ToastContent from "../../../../../../common-components/Toast";
import CreatePostModal from "../CreatePost/popup/CreatePostModal";

const PostsLists = () => {
  /* Redux Vars */
  const userData = useSelector((state) => state.auth.userData);
  const creatingPosts = useSelector((state) => state.posts.creatingPosts);
  let allPosts = useSelector((state) => state.posts.allPosts);
  const currentPage = useSelector((state) => state.posts.currentPage);
  const perPageItem = useSelector((state) => state.posts.perPageItem);
  const dispatch = useDispatch();

  /* State Vars */
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [showEditPostModal, setEditPostModal] = React.useState(false);
  const [editPostData, setEditPostData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);


  /* Functions to handle selelcted post */
  const handleSelectedPost = (postId) => {
    setSelectedPost(postId);
    setTimeout(() => {
      setSelectedPost(null);
    }, 5000);
  };

  /* Functions to getAll posts */
  const handleGetAllPosts = async (data) => {
    let bodyData = data;
    if (allPosts.data.length == 0) {
      setIsLoading(true);
    }
    const apiRes = await dispatch(getPostsList(bodyData));
    setIsLoading(false);
  };

  /* Functions to get data on mount*/
  useEffect(() => {
    handleGetAllPosts({ page: currentPage, perPageItem: perPageItem });
  }, []);

  /* Functions to fetch more posts */
  const fetchMorePosts = () => {
    handleGetAllPosts({ page: currentPage + 1, perPageItem: perPageItem });
  }

  /* Functions to handle post delete */
  const handleDelete = async (selectedPost) => {
    const bodyData = {
      postId: selectedPost,
    }
    const apiRes = await dispatch(handlePostDelete(bodyData));
    if (apiRes.payload.status) {
        fetchMorePosts()
        setSelectedPost(null);
    } else {
      toast.error(
        <ToastContent status="Error" body={apiRes.payload.message} />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        }
      )
    }
  };

  /* Functions to handle post like dislike */
  const handlePostLikeDislike = (postId, like) => {
    let bodyData = {
      postId: postId,
      like: like ? false : true,
    }
    dispatch(updatePostLikeDislike(bodyData));
    const postIndex = allPosts.data.findIndex((item) => item._id == postId);
    let oldPostLists = JSON.parse(JSON.stringify([...allPosts.data]));

    if (like) {
      oldPostLists[postIndex].likes = oldPostLists[postIndex].likes.filter((item) => item._id !== userData._id);
    } else {
      oldPostLists[postIndex].likes.push({_id: userData._id});
    }
    
    dispatch(updatePostList({data: [...oldPostLists], hasMore: allPosts.hasMore}));
    
  }




  /* Functions to handle post edit */
  const handleEditPost = (postId) => {
    // const postData = allPostsList.filter((item) => item._id === postId);
    const postData = allPosts.data.filter((item) => item._id === postId);
    if (!isEmpty(postData)) {
      setEditPostData(postData[0]);
      setEditPostModal(true);
      setSelectedPost(null);
    }
  }

  /* Functions to handle post edit submit */
  const handleEditPostSubmit = async (data) => {

    let formData = new FormData();
    formData.append("postContent", data.postContent);
    formData.append("postId", data.postId);

    const oldfiles = data.files.filter((item) => item.url);
    const newFiles = data.files.filter((item) => !item.url);

    if (newFiles.length > 0) {
      newFiles.forEach((file) => {
        formData.append("files", file);
      });
    }
    formData.append("oldFiles", JSON.stringify(oldfiles));
    setEditPostData(null);
    setEditPostModal(false);
    
    const apiRes = await dispatch(handleUpdatePost(formData));
    if (apiRes.payload.status) {
      const postId = apiRes.payload.data;
      const postIndex = allPosts.data.findIndex((item) => item._id == postId);
      
      const postApiRes = await dispatch(getPostById({postId}));
      if (postApiRes.payload.status) {
        let newPost = postApiRes.payload.data;

        let oldPostLists = JSON.parse(JSON.stringify([...allPosts.data]));


        oldPostLists[postIndex] = newPost;

        dispatch(updatePostList({data: [...oldPostLists], hasMore: allPosts.hasMore}));
      }
    }
    
  }

  return (
    <React.Fragment>
      {creatingPosts && <CreatePostMessage />}
      {isLoading && <div className="h-screen text-white flex items-center justify-between">
      <div className="animate-spin text-center mx-auto rounded-full h-16 w-16 border-t-2 border-b-8 border-white"></div>
        </div>}
      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={allPosts.data} //This is important field to render the next data
        next={() => fetchMorePosts()}
        hasMore={allPosts.hasMore}
        loader={<h4 className="text-center text-white">Loading...</h4>}
        
      >
       {!isEmpty(allPosts.data) &&
        allPosts.data.map((item, index) => {
          return (
            <PostCard
              key={index}
              post={item}
              handleSelectedPost={handleSelectedPost}
              selectedPost={selectedPost}
              handleDelete={handleDelete}
              handlePostLikeDislike={handlePostLikeDislike}
              handleEditPost={handleEditPost}
            />
          );
        })}
      </InfiniteScroll>

      {showEditPostModal && <CreatePostModal data={editPostData} show={showEditPostModal} handleCancel={() => setEditPostModal(false)} handleSubmit={handleEditPostSubmit}/>}
    </React.Fragment>
  );
};

export default PostsLists;
