import React from "react";
import "./style.css";

import { Button } from "react-bootstrap";
import { addOne, deleteShort } from "../../fbase";

const Shortlist = ({ data }) => {
  const handleAdd = () => {
    addOne(data, () => console.log("success"));
  };
  const handleDel = () => {
    deleteShort(data.id);
  };
  return (
    <div className="shortlist">
      <div className="shortlistEntries">
        Player name: <span>{data.playerName}</span>
      </div>
      <div className="shortlistEntries">
        Average GPM: <span>{data.averageGPM}</span>
      </div>
      <div className="shortlistEntries">
        Average XPM: <span>{data.averageXPM}</span>
      </div>
      <div className="addOrRemove">
        <Button
          onClick={() => handleAdd()}
          variant="primary"
          style={{ height: "40px", gridColumn: "2/3" }}
        >
          Add
        </Button>
        <Button
          onClick={() => handleDel()}
          variant="warning"
          style={{ height: "40px", gridColumn: "4/5" }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default Shortlist;
{
}
