import React, { useState } from "react";
import { defaultAvatar, VALIDATION_MESSAGES } from "../../../../configs/Contants";
import { toast, Slide } from "react-toastify";
import ToastContent from "../../../../common-components/Toast";
import { uploadFiles } from "../../../../common-api-store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isEmpty } from "../../../../configs/Funtions";
const EditProfile = ({userDetails, show, handleClose, handleSubmit}) => {
  /* State Vars */
  const [newImage, setNewImage] = useState(null);

 

  /* Formik */
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: !isEmpty(userDetails.username) ? userDetails.username : "",
            email: !isEmpty(userDetails.email) ? userDetails.email : "",
            name: !isEmpty(userDetails.name) ? userDetails.name : "",
            bio: !isEmpty(userDetails.bio) ? userDetails.bio : "",
            profilePicture: !isEmpty(userDetails.profilePicture) ? userDetails.profilePicture : "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required(VALIDATION_MESSAGES.required),
            email: Yup.string().email(VALIDATION_MESSAGES.email).required(VALIDATION_MESSAGES.required),
            name: Yup.string().required(VALIDATION_MESSAGES.required),
            bio: Yup.string().required(VALIDATION_MESSAGES.required),
            profilePicture: Yup.string(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });


 /* Function to handle image upload */
 const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 2) {
      toast.error(
        <ToastContent
          status="Error"
          message="File size should be less than 2MB"
        />,
        {
          transition: Slide,
          closeButton: true,
          autoClose: 2000,
          position: "top-center",
        }
      );
      return;
    }
    if (!file.type.includes("image/")) {
      toast.error(
        <ToastContent status="Error" message="Only Image is allowed!" />,
        {
          transition: Slide,
          closeButton: true,
          autoClose: 2000,
          position: "top-center",
        }
      );
      return;
    }

    if (file) {
      setNewImage(URL.createObjectURL(file));
    }
    const formData = new FormData();
      formData.append("files", file);

    const apiRes = await uploadFiles(formData);
    if (apiRes.status) {
        let newImage = apiRes.data[0].url;
        formik.setFieldValue("profilePicture", newImage);
    } else {
        toast.error(
            <ToastContent status="Error" message={apiRes.message} />,
            {
            transition: Slide,
            closeButton: true,
            autoClose: 2000,
            position: "top-center",
            }
        );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
      <div className="bg-white h-auto m-3 w-full sm:w-full lg:w-3/4 xl:w-3/4 md:w-5/6 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <hr />
        <form className="mt-2" onSubmit={formik.handleSubmit}>
          {/* Profile Picture */}
          <div className="mb-4">
            
            <div className="relative w-full">
              <label>
                <img
                  src={formik.values.profilePicture || defaultAvatar}
                  alt="Profile"
                  role="button"
                  className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-black shadow-lg"
                />
              </label>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              name="username"
              id="username"
              value={formik.values.username}
                onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username && <span className="text-red-500">{formik.errors.username}</span>}
          </div>
           {/* Name */}
           <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
                name="name"
                id="name"
              className="border border-gray-300 p-2 w-full"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && <span className="text-red-500">{formik.errors.name}</span>}

          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
                id="email"
                readOnly
              className="border border-gray-300 p-2 w-full"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && <span className="text-red-500">{formik.errors.email}</span>}

          </div>

         

          {/* Bio */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Bio
            </label>
            <textarea
             name="bio"
             id="bio"
             rows={3}
              className="border border-gray-300 p-2 w-full"
              value={formik.values.bio}
              onChange={formik.handleChange}
            />
            {formik.errors.bio && formik.touched.bio && <span className="text-red-500">{formik.errors.bio}</span>}

          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 mr-2 rounded-lg"
                onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
