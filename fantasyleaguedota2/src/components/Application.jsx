import React, { useContext } from "react";
//import { Route, Switch } from "react-router-dom";
import "firebase/firestore";
import "firebase/auth";

import SignUpDiv from "./SignUpDiv";

import ProfilePage from "./SignedIn/ProfilePage";
import { UserContext } from "./providers/UserProvider";

const Application = () => {
  const user = useContext(UserContext);
  return user ? <ProfilePage /> : <SignUpDiv />;
};

export default Application;
