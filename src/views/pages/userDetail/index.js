import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUserDetails, updateFollowStatus, updateProfile } from "./store";
import { isEmpty } from "../../../configs/Funtions";
import { defaultAvatar } from "../../../configs/Contants";
import EditProfile from "./popup/EditProfile";
import { toast, Slide } from "react-toastify";
import ToastContent from "../../../common-components/Toast";
const UserDetail = () => {
  /* Redux Vars */
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.selectedUser);
  const userData = useSelector((state) => state.auth.userData);

  /* State vars */
  const [showEditProfileModal, setShowEditProfileModal] = React.useState(false);

  /* Routes Vars */
  const { username } = useParams();

  /* Local Vars */
  const myProfile = user._id == userData._id;

  /* Function to get selected user details */
  const getSelectedUserDetails = () => {
    let bodyData = {
      username,
    };

    if (!isEmpty(userData)) {
      bodyData = {
        ...bodyData,
        userId: userData._id,
      };
    }
    dispatch(getUserDetails(bodyData));
  };

  /* Function to get data on page mout */
  React.useEffect(() => {
    getSelectedUserDetails();
  }, [username]);

  const userDetails = {
    isMyAccount: myProfile,
    _id: user._id ? user._id : "",
    username: user.username ? user.username : "",
    email: user.email ? user.email : "",
    profilePicture: user.profile
      ? user.profile.profilePicture
        ? user.profile.profilePicture
        : defaultAvatar
      : defaultAvatar,
    name: user.profile
      ? user.profile.name
        ? user.profile.name
        : ""
      : "",
    bio: user.profile
      ? user.profile.bio
        ? user.profile.bio
        : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    postsCount: user.posts ? user.posts.length : 0,
    isFollowing: user.isFollowing ? user.isFollowing : false,
    totalFollowers: user.totalFollowers ? user.totalFollowers : 0,
    totalFollowing: user.totalFollowing ? user.totalFollowing : 0,
  };

  /* Function to handle proflie submit */
  const handleEditProfile = async (values) => {
    const bodyData = {
      ...values,
    }
    const apiRes = await dispatch(updateProfile(bodyData));
    if (apiRes.payload.status) {
      setShowEditProfileModal(false);
      getSelectedUserDetails();
      toast.success(
        <ToastContent status="Success" message={apiRes.payload.message} />,
        {
          autoClose: 2000,
          hideProgressBar: true,
          transition: Slide,
          position: "top-center",
        }
      )
    } else {
      toast.error(
        <ToastContent status="Error" message={apiRes.payload.message} />,
        {
          autoClose: 2000,
          hideProgressBar: true,
          transition: Slide,
          position: "top-center",
        }
      )
    }
  }

  /* Function to handle follow */
  const handleFollow = async () => {
    const bodyData = {
      userId: userDetails._id,
      follow: !userDetails.isFollowing
    }
    const apiRes = await dispatch(updateFollowStatus(bodyData));

    if (apiRes.payload.status) {
      getSelectedUserDetails();
    } else {
      toast.error(
        <ToastContent status="Error" message={apiRes.payload.message} />,
        {
          autoClose: 2000,
          hideProgressBar: true,
          transition: Slide,
          position: "top-center",
        }
      )
    }
  }

  return (
    <React.Fragment>

    <div className="homepage mt-20 w-full h-screen w-100 bg-black">
      <div className="px-0 h-full">
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-white">
            {/* <!-- User Avatar --> */}
            <div className="relative">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/257/607/655/red-iron-man-on-black-background-iron-man-wallpaper-preview.jpg"
                alt="User Avatar"
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={userDetails.profilePicture}
                  alt="User Profile"
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
              </div>
            </div>

            {/* <!-- User Info --> */}
            <div className="p-4">
              <h1 className="text-2xl font-semibold">
                {userDetails.name ? userDetails.name : ''} ({userDetails.email})
              </h1>
              <p className="text-gray-600">@{userDetails.username}</p>
              <p className="mt-2 text-gray-700">{userDetails.bio}</p>

              {/* <!-- Follow Button --> */}
              {userDetails.isMyAccount ? (
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" onClick={() => setShowEditProfileModal(true)}>
                  Edit Profile
                </button>
              ) : (
                userDetails.isFollowing ?  <button onClick={handleFollow} className="mt-4 px-4 py-2 bg-white text-blue-500 font-semibold rounded-full border-2 border-blue-500 focus:outline-none focus:ring focus:ring-blue-300">
                  Following
                </button> : <button onClick={handleFollow} className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                  Follow
                </button>
              )}

              {/* <!-- Social Stats --> */}
              <div className="mt-4 grid gap-3 grid-cols-12 w-full">
                <div className="col-span-4">
                  <span className="font-semibold text-gray-800 mr-2">{userDetails.totalFollowers}</span>
                  <span className="text-gray-600">Followers</span>
                </div>
                <div className="col-span-4">
                  <span className="font-semibold text-gray-800 mr-2">{userDetails.totalFollowing}</span>
                  <span className="text-gray-600">Following</span>
                </div>
                <div className="col-span-4">
                  <span className="font-semibold text-gray-800 mr-2">
                    {userDetails.postsCount}
                  </span>
                  <span className="text-gray-600">Posts</span>
                </div>
              </div>

              {/* <!-- User Interactions --> */}
              <div className="mt-4  grid gap-3 grid-cols-12 w-full">
                <button className="px-6 py-2 text-gray-600 hover:text-blue-500 focus:outline-none  border-2 border-gray-500  rounded-2xl col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                  <i className="fab fa-facebook-messenger mr-3"></i>
                  Message
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-blue-500 focus:outline-none  border-2 border-gray-500  rounded-2xl col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                  <i className="fa-regular fa-envelope mr-3"></i>
                  Email
                </button>
                <button className="px-6 py-2 text-gray-600 hover:text-blue-500 focus:outline-none  border-2 border-gray-500  rounded-2xl col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                  <i className="fa-solid fa-phone mr-3"></i>
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {showEditProfileModal && <EditProfile show={showEditProfileModal} userDetails={userDetails} handleClose={() => setShowEditProfileModal(false)} handleSubmit={handleEditProfile}/>}
    </React.Fragment>
  );
};

export default UserDetail;
