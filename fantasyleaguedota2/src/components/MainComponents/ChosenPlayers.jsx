import React, { useState } from "react";

import { Button } from "react-bootstrap";
import { deleteChosen } from "../../fbase";

const ChosenPlayers = ({ data }) => {
  const [mount, setMount] = useState(false);
  const handleClick = () => {
    console.log(data.id);
    deleteChosen(data.id);
    setMount(true)
  };
  return (
    !mount ? (
    <div style={{ color: "white" }}>
      <div>
        <h3>{data.playerName}</h3>
      </div>
      <div
        style={{
          backgroundImage: "url('../img/man-avatar-1632965-640x640.jpg')",
          height: "50px",
          width: "50px",
        }}
      ></div>
      <div className="statsnumbers">
        <div>Team: {data.teamName}</div>
        <div>Average GPM: {data.averageGPM}</div>
        <div>Average XPM: {data.averageXPM}</div>
        <div>Hero Damage: {data.averageHeroDamage}</div>
        <div>Wins: {data.totalWins}</div>
        <div>Losses: {data.totalLost}</div>
        <Button
          style={{
            marginTop: "10px",
            height: "30px",
            width: "90px",
            padding: "0 0 5px 0",
          }}
          variant="warning"
          onClick={() => handleClick()}
        >
          remove
        </Button>
      </div>
    </div>) : null
  );
};

export default ChosenPlayers;

// import it first
