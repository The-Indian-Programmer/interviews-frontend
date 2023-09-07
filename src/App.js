import React, { Component, Suspense, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePageLayout from "../src/views/layout/homeLayout";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { API_URL } from "./configs/Contants";
import { useDispatch, useSelector } from "react-redux";
import {updateOnlineStatus, updateUserSocketId} from "./redux/socketData";
const App = () => {
   /* Redux Vars */
   const dispatch = useDispatch();
   const userData = useSelector((state) => state.auth.userData);
   const onlineUsers = useSelector((state) => state.socket.onlineUsers)

  /* Socket Vars */
  const socket = io(API_URL, { transports: ["websocket"], query: { userId: userData._id }});

 

  useEffect(() => {
    socket.on("updateOnlineStatus", (data) => {
      dispatch(updateOnlineStatus(data));
    });

    socket.on("connected", (data) => {
      dispatch(updateUserSocketId(data));
    });

    socket.on("likeNotification", (data) => {
      console.log(data)
    });

    socket.on("commentNotification", (data) => {
      
    });

    socket.on("followNotification", (data) => {});

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Suspense fallback={"pageLoader"}>
      <Switch>
        <Route
          path="/"
          name="Layout"
          render={(props) => <HomePageLayout pageLoader={"pageLoader"} />}
        />
      </Switch>
    </Suspense>
  );
};

export default App;
