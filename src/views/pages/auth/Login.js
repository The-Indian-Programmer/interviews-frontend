import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "../../../configs/Contants";
import { Link } from "react-router-dom";
import useJwt from '../../../auth/jwt/useJwt'
import { useDispatch } from "react-redux";
import {handleLogin} from '../../../redux/authentication'
import ToastContent from "../../../common-components/Toast";
import { toast, Slide } from 'react-toastify'
import { getHomeRouteForLoggedInUser } from "../../../auth/utils";
import { useHistory } from "react-router-dom";

const Login = () => {
  /* State Vars */
  const [isLoading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");


  /* Redux Vars */
  const dispatch = useDispatch()

  /* React Router Vars */
  const history = useHistory();

  /* Formik Vars */
  const formik = useFormik({
    initialValues: {
      email: "sumitkosta07@gmail.com",
      password: "123456",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(VALIDATION_MESSAGES.email)
        .required(VALIDATION_MESSAGES.required),
      password: Yup.string().required(VALIDATION_MESSAGES.required),
    }),
    onSubmit: (values) => {
      handleUserLogin(values);
    },
  });


  /* Function to handle Login */
  const handleUserLogin = async (data) => {
    // setLoading(true);
    if (Object.values(data).every(field => field.length > 0)) {
      const apiRes = await useJwt.login({ email: data.email, password: data.password });
      if (apiRes.data.status) {
        const data = {...apiRes.data.data, accessToken: apiRes.data.token, refreshToken: apiRes.data.token}
        dispatch(handleLogin(data))
        const homeRoutes = getHomeRouteForLoggedInUser(data)
        history.push(homeRoutes)
        toast.success(<ToastContent status="Success" message={apiRes.data.message} />, { transition: Slide, hideProgressBar: true, autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER })
      } else {
        toast.error(<ToastContent status="Error" message={apiRes.data.message} />, { transition: Slide, hideProgressBar: true, autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER})
      }
    } 
  };


  return (
    <div className="container-fluid">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 h-full">
        <div className="w-full xl:w-1/2 lg:w-1/2 md:w-1/2 h-5/6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`mt-1 px-4 py-2 w-full  rounded-lg  border-2 ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-800"
                    : "border-gray-800"
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <span className="text-red-800">{formik.errors.email}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`mt-1 px-4 py-2 w-full  rounded-lg  border-2 ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-800"
                    : "border-gray-800"
                }`}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-800">{formik.errors.password}</span>
              )}
            </div>
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full  py-2 px-4 border bg-gray-900 text-white rounded-lg hover:bg-gray-100 hover:border-gray-800 hover:text-gray-800"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-blue-500 text-center d-block mx-auto w-100 mt-5"><Link to='/register'> Don't have an account ?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
