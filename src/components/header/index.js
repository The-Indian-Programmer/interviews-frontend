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
        const apiRes = await useJwtVars.logout();
        dispatch(handleLogout());
        history.push("/");
        setIsOpen(false);
      } else if (result.isDenied) {
        setIsOpen(false);
      }
    })
  }
  const handleProfile = () => {
    history.push(`/user/${userData.username}`);
  }

  /* Show icon based on user login status */
  const RenderUserIcon = () => {
    if (isUserLoggedIn()) {
      return (
        <>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <img
              src={defaultAvatar}
              alt="Avatar"
              onClick={toggleDropdown}
              role="button"
              className="w-12 h-12 object-cover border rounded-full border-gray-300 shadow-sm"
            />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg z-10">
                <ul>
                  <li  className="cursor-pointer py-2 px-4 hover:bg-gray-100 text-center font-bold" onClick={handleProfile}>Profile</li>
                  <li onClick={handleUserLogout} className="cursor-pointer py-2 px-4 hover:bg-gray-100 text-center font-bold">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </>
      );
    } else {
      return (<button
        role="button"
        onClick={() => handleLogin()}
        className="flex items-center bg-gradient-to-r from-white to-gray-200 text-black font-semibold py-2 px-6 rounded-md shadow-md"
      >
        <i className="fa-solid fa-right-to-bracket me-2"></i> Login
      </button>);
    }
  };

  return (
    <>
      <nav
        className={`${
          scrolling
            ? "bg-gray-500 text-white"
            : "text-white bg-gradient-to-r from-gray-500 to-gray-600"
        } py-4 px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50`}
      >
        <Link to="/" className="flex items-center" role="button">
          <svg className="h-6 w-6 text-white bg-gray-500 rounded-full p-1 ">
            <path
              className="fill-current"
              d="M9.313 14.92c-.028.193-.07.379-.124.56l-.375 1.499h5.373l-.374-1.499a3.001 3.001 0 0 0-.124-.56l-.506-1.52a4.468 4.468 0 0 0-.468-1.015L12 10.5l-.218-.655a4.468 4.468 0 0 0-.468 1.015l-.506 1.52zM16.5 5h-2V3a2 2 0 0 0-4 0v2h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-1 10H6V7h9v8z"
            />
          </svg>

          <span className="ml-3 md:block lg:block hidden font-extrabold text-xl bg-none hover:bg-none">
            Social Media
          </span>
        </Link>
        <RenderUserIcon />
      </nav>
    </>
  );
};

export default Header;
