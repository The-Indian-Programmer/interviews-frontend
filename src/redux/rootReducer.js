// ** Reducers Imports
import FundersList from "../views/pages/allfunders/store/index";
import Auth from "./authentication";
import posts from "../views/pages/homepage/layout/MainContent/store/index";
import UserDetails from "../views/pages/userDetail/store/index";
import users from "../views/pages/homepage/layout/SidebarLeft/store/index";
import socketData from "./socketData";

const rootReducer = {
  FundersList,
  auth: Auth,
  posts,
  user: UserDetails,
  users: users,
  socket: socketData,
};

export default rootReducer;
