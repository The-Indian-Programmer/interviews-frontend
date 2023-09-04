import React from "react";
import {
  VALIDATION_MESSAGES,
  defaultAvatar,
} from "../../../../../../../configs/Contants";
import { isEmpty } from "../../../../../../../configs/Funtions";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import ToastContent from "../../../../../../../common-components/Toast";
import { uploadFiles } from "../../../../../../../common-api-store";
import { useFormik } from "formik";
import * as Yup from "yup";
const CreatePostModal = ({ show, handleCancel, handleSubmit }) => {
  /* Formik */
  const formik = useFormik({
    initialValues: {
      postContent: "",
      files: [],
    },
    validationSchema: Yup.object({
      postContent: Yup.string().required(VALIDATION_MESSAGES.required),
      files: Yup.array(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  /* DropZone to handlefile upload */
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (result) => {
      const newResult = result.filter(
        (item) => item.type.includes("image/") || item.type.includes("video/")
      );
      const notVideoAndImage = result.filter(
        (item) =>
          !(item.type.includes("image/") || item.type.includes("video/"))
      );

      if (notVideoAndImage.length > 0) {
        toast.error(
          <ToastContent
            status="Error"
            message="Only image and video files are allowed"
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
          }
        );
      }

      if (newResult.length > 0) {
        handleFileUpload(newResult);
      }
    },
  });

  /* Handle file upload */
  const handleFileUpload = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const apiRes = await uploadFiles(formData);
    if (apiRes.status) {
      toast.success(
        <ToastContent status="Success" message={apiRes.message} />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        }
      );

      formik.setFieldValue("files", [...formik.values.files, ...apiRes.data]);
    } else {
      toast.error(
        <ToastContent status="Error" message={"Can't upload files!!"} />,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        }
      );
    }
  };


  /* Handle file remove */
  const handleFileRemove = (file) => {
    const newFiles = formik.values.files.filter((item) => item !== file);
    formik.setFieldValue("files", newFiles);
  }

  /* Render Image */
  const RenderImage = ({ file }) => {
    return (
      <div className="w-28 h-28 col-span-3 border rounded-lg relative">
        <i onClick={() => handleFileRemove(file)} className="fas fa-times absolute -right-2 -top-2 bg-white rounded-full p-1 text-red-500 cursor-pointer"></i>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={file.url}
          alt=""
        />
      </div>
    );
  };

  /* Render Video */
  const RenderVideo = ({ file }) => {
    return (
      <div className="w-28 h-28 col-span-3 border rounded-lg relative">
        <i onClick={() => handleFileRemove(file)} className="fas fa-times absolute -right-2 -top-2 bg-white rounded-full p-1 text-red-500 cursor-pointer"></i>
        <video
          className="w-full h-full object-cover rounded-lg"
          src={file.url}
          alt=""
          controls
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 overflow-y-auto w-full">
      <div className="absolute top-0 left-0 right-0 bg-gray-900 opacity-50 h-full w-full"></div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl z-50 mt-10 mx-4 w-full sm:w-full md:w-3/4 xl:w-2/3 lg:w-5/6">
        <div className="flex flex-row items-center cursor-pointer">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full border-2 border-gray-100"
              src={defaultAvatar}
              alt=""
            />
          </div>
          <div className="ml-2 w-full p-2 flex flex-col items-start justify-between">
            <span className="font-extrabold">Sumit Kosta</span>
            <span className="text-xs text-white font-semibold">Public</span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
        {/* Post content form goes here */}
        <textarea
          className="w-full h-32 text-black p-2 rounded-md resize-none bg-none outline-none border border-gray-300 mt-4"
          value={formik.values.postContent}
          onChange={formik.handleChange}
          name="postContent"
          id="postContent"
          rows={4}
          placeholder="Write your post here..."
        ></textarea>
        {formik.errors.postContent && formik.touched.postContent && <span className="text-red-500">{formik.errors.postContent}</span>}
        {/* {Add Media  */}
        <div className="flex flex-row justify-between items-center mt-4">
          <div>
            {/* File input */}
            <div className="flex flex-row items-center">
              <label className="flex flex-row items-center cursor-pointer">
                <span className="text-white font-semibold">
                  <i className="fas fa-file text-blue-500 mr-3"></i>
                  Add Media
                </span>
                {/* <input accept="image/*" type="file" className="hidden" /> */}
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} accept="image/*, video/*" />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Show selected files */}
        {!isEmpty(formik.values.files) && formik.values.files.length > 0 && (
          <div className="grid grid-cols-12 gap-3 mt-2">
            {formik.values.files.map((file, index) =>
              file.type == "image" ? (
                <RenderImage file={file} key={index} />
              ) : file.type == "video" ? (
                <RenderVideo file={file} key={index} />
              ) : (
                ""
              )
            )}
          </div>
        )}

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-full">
          Post
        </button>
        <button
          onClick={handleCancel}
          className="text-gray-600 font-semibold py-2 px-4 mt-4 ml-2"
        >
          Cancel
        </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
