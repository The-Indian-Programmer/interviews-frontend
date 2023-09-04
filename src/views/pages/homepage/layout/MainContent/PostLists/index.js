import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePostMessage from "./CreatePostMessage";
import { isEmpty } from "../../../../../../configs/Funtions";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import { getPostsList, handlePostDelete, updatePostLikeDislike, updatePostList } from "../../../store";
import { toast } from "react-toastify";
import ToastContent from "../../../../../../common-components/Toast";

const PostsLists = () => {
  /* Redux Vars */
  const creatingPosts = useSelector((state) => state.posts.creatingPosts);
  let allPosts = useSelector((state) => state.posts.allPosts);
  const currentPage = useSelector((state) => state.posts.currentPage);
  const perPageItem = useSelector((state) => state.posts.perPageItem);
  const dispatch = useDispatch();

  /* State Vars */
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [allPostsList, setAllPostsList] = React.useState(allPosts.data); 
  const [hasMore, setHasMore] = React.useState(allPosts.hasMore);



  /* Functions to handle selelcted post */
  const handleSelectedPost = (postId) => {
    setSelectedPost(postId);
    setTimeout(() => {
      setSelectedPost(null);
    }, 5000);
  };

  /* Functions to getAll posts */
  const handleGetAllPosts = (data) => {
    let bodyData = data;
    dispatch(getPostsList(bodyData));
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
        setAllPostsList(allPostsList.filter((item) => item._id !== selectedPost));
        dispatch(updatePostList({data: allPostsList.filter((item) => item._id !== selectedPost), hasMore}));
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
    
  }

  useEffect(() => {
    if (!isEmpty(allPosts)) {
      setAllPostsList(allPosts.data);
      setHasMore(allPosts.hasMore);
    }
  }, [allPosts]);

  return (
    <React.Fragment>
      {creatingPosts && <CreatePostMessage />}

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={allPostsList} //This is important field to render the next data
        next={() => fetchMorePosts()}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        
      >
       {!isEmpty(allPostsList) &&
        allPostsList.map((item, index) => {
          return (
            <PostCard
              key={index}
              post={item}
              handleSelectedPost={handleSelectedPost}
              selectedPost={selectedPost}
              handleDelete={handleDelete}
              handlePostLikeDislike={handlePostLikeDislike}
            />
          );
        })}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default PostsLists;
