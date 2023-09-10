import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../configs/Funtions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { isUserLoggedIn } from "../../auth/utils";
import { defaultAvatar } from "../../configs/Contants";
import Swal from "sweetalert2";
import { handleLogout } from "../../redux/authentication";
import useJwt from "../../@core/auth/jwt/useJwt";
import useJwtVars from '../../auth/jwt/useJwt'

const Header = () => {
  // Local state
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* Function to handle dropdown menus */
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  // Redux state
  const userData = useSelector((state) => state.auth.userData);
  const otherData = useSelector((state) => state.auth.otherData);
  const dispatch = useDispatch();

  /* Routes vars */
  const history = useHistory();

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let isWalletConnected = false;
  if (isEmpty(userData)) {
    isWalletConnected = false;
  } else {
    isWalletConnected = true;
  }

  /* Function to handle user login */
  const handleLogin = () => {
    history.push("/login");
  };

  /* Function to handle user logout */
  const handleUserLogout = () => {
    Swal.fire({
      title: 'Sure you want to logout?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Logout',
      confirmButtonColor: '#610090',
      denyButtonText: `No, Not now`,
      denyButtonColor: '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // const apiRes = await useJwtVars.logout();
        dispatch(handleLogout());
        history.push("/login");
        setIsOpen(false);
      } else if (result.isDenied) {
        setIsOpen(false);
      }
    })
  }


  /* Show icon based on user login status */
  const RenderUserIcon = () => {

    const handleButtonClick = () => {
      if (isUserLoggedIn()) {
        handleUserLogout();
      } else {
        handleLogin();
      }
    }
    return <button
    role="button"
    onClick={() => handleButtonClick()}
    className="flex items-center bg-white border-2 border-black text-black font-semibold py-2 px-6 rounded-md shadow-md"
  >
    {!isUserLoggedIn() && <i className="fas fa-user mr-2"></i>}
     {isUserLoggedIn() ? 'Logout' : 'Login'}
     {isUserLoggedIn() && <i className="fas fa-sign-out-alt ml-2"></i>}
  </button>
  };

  return (
    <>
      <nav
        className={`bg-white text-black py-4 px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50`}
      >
        <Link to="/" className="flex items-center" role="button">
          <svg className="h-6 w-6 text-white bg-gray-500 rounded-full p-1 ">
            <path
              className="fill-current"
              d="M9.313 14.92c-.028.193-.07.379-.124.56l-.375 1.499h5.373l-.374-1.499a3.001 3.001 0 0 0-.124-.56l-.506-1.52a4.468 4.468 0 0 0-.468-1.015L12 10.5l-.218-.655a4.468 4.468 0 0 0-.468 1.015l-.506 1.52zM16.5 5h-2V3a2 2 0 0 0-4 0v2h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-1 10H6V7h9v8z"
            />
          </svg>

          <span className="ml-3 md:block lg:block hidden font-extrabold text-xl bg-none hover:bg-none">
            Todo App
          </span>
        </Link>
        <RenderUserIcon />
      </nav>
    </>
  );
};

export default Header;
