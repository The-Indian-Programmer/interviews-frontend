import React from "react";
import { useSelector } from "react-redux";
import SidebarLeft from "./layout/SidebarLeft";
import MainContent from "./layout/MainContent/Index";
import SidebarRight from "./layout/SidebarRight";
const HomePage = () => {
  // Redux vars
  const userData = useSelector((state) => state.auth.userData);

  return (
    <React.Fragment>
      <div className="homepage mt-20 w-full w-100 h-full">
        <div className="px-0 h-full">
          <div className="grid grid-cols-12 h-full bg-black">
            <SidebarLeft />
            <MainContent />
            <SidebarRight />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
