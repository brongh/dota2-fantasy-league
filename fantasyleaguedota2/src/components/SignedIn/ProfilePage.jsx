import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../../fbase";

import "./style.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email } = user;
  console.log(user);

  return (
    <div className="profilepage">
      <div className="profileContainer">
        <div>
          <h3>{displayName}, you are logged in!</h3>
        </div>
        <div
          style={{
            background: `url(${
              photoURL ||
              "https://res.cloudinary.com//image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
            })  no-repeat center center`,
            backgroundSize: "cover",
            height: "100px",
            width: "100px",
            borderRadius: "50px",
          }}
        ></div>
        <div>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Account Details
          </p>
          <p className="details">{displayName}</p>
          <p className="details">{email}</p>
        </div>
      </div>
      <Button
        onClick={() => {
          auth.signOut();
        }}
        variant="dark"
      >
        Sign out
      </Button>
    </div>
  );
};
export default ProfilePage;

{
  /* <button
        className="w-full py-3 bg-red-600 mt-4 text-white"
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button> */
}
