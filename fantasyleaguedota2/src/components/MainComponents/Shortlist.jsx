import React, { useEffect, useState } from "react";
import "./style.css";

import { Button } from "react-bootstrap";
import { addOne, deleteShort } from "../../fbase";

const Shortlist = ({ data }) => {
  const [slData, setSlData] = useState([]);
  const [mounted, setMounted] = useState(false);
  
  const handleAdd = () => {
    addOne(data, () => console.log("success"));
    setMounted(true);
  };
  const handleDel = () => {
    deleteShort(data.id);
    setSlData([]);
    setMounted(true);
  };

  useEffect(() => {
    if (!mounted) setSlData(data);
  }, [mounted])

  return (
    !mounted ? (
    <div className="shortlist">
      <div className="shortlistEntries">
        Player name: <span>{slData.playerName}</span>
      </div>
      <div className="shortlistEntries">
        Average GPM: <span>{slData.averageGPM}</span>
      </div>
      <div className="shortlistEntries">
        Average XPM: <span>{slData.averageXPM}</span>
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
    </div>) : null
  );
};

export default Shortlist;

