import React from "react";
import { Route, Switch } from "react-router-dom";

import "./style.css";

import Application from "./Application";
import Teams from "./MainComponents/Teams";
import Players from "./MainComponents/Players";
import UserProvider from "./providers/UserProvider";
import TeamPlayerStats from "./MainComponents/TeamPlayerStats";
import TeamPlayerStatsMore from "./MainComponents/TeamPlayerStatsMore";
import FantasyBoard from "./MainComponents/FantasyBoard";
import { UserContext } from "./providers/UserProvider";

const Main = () => {
  return (
    <div className="background">
      <Switch>
        <Route exact path="/">
          <UserProvider>
            <Application />
          </UserProvider>
        </Route>
        <Route exact path={`/teams/:teamID`}>
          <TeamPlayerStats />
        </Route>
        <Route path={`/teams/:teamID/players/:teamPlayerMoreID`}>
          <TeamPlayerStatsMore />
        </Route>
        <Route exact path="/teams">
          <Teams />
        </Route>
        <Route exact path="/players">
          <Players />
        </Route>
        <Route path="/fantasyboard">
          <FantasyBoard />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
