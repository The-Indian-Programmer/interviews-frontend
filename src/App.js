import React, { Component, Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom"
import HomePageLayout from "../src/views/layout/homeLayout"
import { useHistory } from 'react-router-dom';

const App = () => {



  
  return (
    <Suspense fallback={'pageLoader'}>
      <Switch>
        <Route
          path="/"
          name="Layout"
          render={props => <HomePageLayout pageLoader={'pageLoader'} />}
        />

      </Switch>
    </Suspense>
  )
}

export default App
