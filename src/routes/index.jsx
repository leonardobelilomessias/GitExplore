import React from "react";
import { Switch,Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Repository from "../pages/Repository";

export default function Routes(){
  return(
    <Switch>
      <Route path="/" exact component= {Dashboard}></Route>
      <Route path="/repositories/:repositories+" component={Repository}></Route>
    </Switch>
  )
}