// ** Reducers Imports
import FundersList from "../views/pages/allfunders/store/index";
import Auth from "./authentication";
import posts from "../views/pages/homepage/store/index";
import UserDetails from "../views/pages/userDetail/store/index";
const rootReducer = {
  FundersList,
  auth: Auth,
  posts,
  user: UserDetails,
};

export default rootReducer;
