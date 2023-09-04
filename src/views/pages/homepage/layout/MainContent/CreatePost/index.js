import React from "react";
import { defaultAvatar } from "../../../../../../configs/Contants";
import CreatePostModal from "./popup/CreatePostModal";
import { handleCreatePost } from "../../../store";
import { useDispatch } from "react-redux";
const CreatePost = () => {

  /* State Vars */
  const [createPostModal, setCreatePostModal] = React.useState(false);

  /* Redux */
  const dispatch = useDispatch();

  

  /* Handle Submit */
  const handlePostSubmit = async (values) => {
    let formData = new FormData();
    formData.append("postContent", values.postContent);
    formData.append("files", JSON.stringify(values.files));
    dispatch(handleCreatePost(formData));
    setCreatePostModal(false);
    
  }
  return (
    <React.Fragment>
    <div className="my-2 mx-0">
      <div className="w-full bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-row items-center cursor-pointer" onClick={() => setCreatePostModal(true)}>
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full border-2 border-gray-100"
              src={defaultAvatar}
              alt=""
            />
          </div>
          <div className="ml-5 border border-gray-300 w-full p-4 rounded-xl">
            <div className="text-sm font-medium text-gray-900">
              <span className="text-white font-extrabold">Star a post </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
            <div>
                <button className=" font-bold py-2 px-4 rounded">
                    <i className="fas fa-camera text-blue-500 mr-3"></i>
                    Image
                </button>
            </div>
            <div>
                <button className="font-bold py-2 px-4 rounded">
                    <i className="fas fa-video text-green-500 mr-3"></i>
                    Video
                </button>
            </div>
            <div>
                <button className=" font-bold py-2 px-4 rounded">
                    <i className="fas fa-file text-red-500 mr-3"></i>
                    File
                </button>
            </div>
        </div>
      </div>
    </div>
    {/* Create Post Modal */}
    {createPostModal &&  <CreatePostModal  show={createPostModal} handleCancel={() => setCreatePostModal(false)} handleSubmit={handlePostSubmit} />}
    </React.Fragment>
  );
};

export default CreatePost;
