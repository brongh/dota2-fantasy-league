import React, { useEffect, useState } from "react";
import "./style.css";

import { readData, readDataChosen, deleteChosen } from "../../fbase";
import Shortlist from "./Shortlist";
import ChosenPlayers from "./ChosenPlayers";

const FantasyBoard = () => {
  const [handleData, setHandleData] = useState([]);
  const [chosenData, setChosenData] = useState([]);

  useEffect(() => {
    readData((items) => setHandleData(items));
    readDataChosen((data) => setChosenData(data));
  }, []);
  console.log("hi" + chosenData);
  let num = 0;
  return (
    <div className="fantasyboard">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gridColumn: "1/2",
          gridRow: "1/6",
          background: "blue",
          margin: "10px",
          background: "rgba(240, 240, 240, 0.4)",
          height: "1000px",
        }}
      >
        <div>
          <h3 style={{ color: "white" }}>Short Listed Players</h3>
        </div>
        {handleData.map((items) => {
          return <Shortlist data={items} key={items.id} />;
        })}
      </div>

      {chosenData.map((items) => {
        num += 1;
        return (
          <div className="playercard" id={`card${num}`}>
            <ChosenPlayers data={items} key={num} />
          </div>
        );
      })}
    </div>
  );
};

export default FantasyBoard;

{
  /* <div className="playercard" id="card1">
        <ChosenPlayers index={0} />
      </div>
      <div className="playercard" id="card2">
        <ChosenPlayers index={1} />
      </div>
      <div className="playercard" id="card3">
        <ChosenPlayers index={2} />
      </div>
      <div className="playercard" id="card4">
        <ChosenPlayers index={3} />
      </div>
      <div className="playercard" id="card5">
        <ChosenPlayers index={4} />
      </div> */
}
