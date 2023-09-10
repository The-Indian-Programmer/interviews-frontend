// ** Reducers Imports
import Auth from "./authentication";
import tasks from "../views/pages/homepage/store/index";
const rootReducer = {
  auth: Auth,
  tasks,
};

export default rootReducer;
