import React from "react";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { signInWithGoogle } from "../fbase";

const SignUpDiv = () => {
  return (
    <div className="signupblock">
      <h3 style={{ color: "white" }}>Join the Dota 2 Fantasy League Now</h3>

      <Button
        variant="warning"
        style={{ marginTop: "30px", width: "18%" }}
        onClick={() => signInWithGoogle()}
      >
        Sign In with Google
      </Button>
    </div>
  );
};

export default SignUpDiv;
