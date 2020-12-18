import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import { grabPlayerIntoFirebase } from "../../fbase";
//import SortIcon from "@material-ui/icons/ArrowDownward";

const columns = [
  {
    name: "Wins",
    selector: "totalWins",
    sortable: true,
  },
  {
    name: "Losses",
    selector: "totalLost",
    sortable: true,
  },
  {
    name: "Average GPM",
    selector: "averageGPM",
    sortable: true,
  },
  {
    name: "Average XPM",
    selector: "averageXPM",
    sortable: true,
  },
  {
    name: "Average Last Hits",
    selector: "averageLastHits",
    sortable: true,
  },
  {
    name: "Average Hero Damage",
    selector: "averageHeroDamage",
    sortable: true,
  },
  {
    name: "Average KDA",
    selector: "finalKDA",
    sortable: true,
  },
];

const TeamPlayerStatsMore = () => {
  const [pullDataStatus, setPullDataStatus] = useState(false);
  const [data, setData] = useState([]);
  const [goodStat, setGoodStat] = useState([]);
  const { teamPlayerMoreID, teamID } = useParams();
  const [playerCheck, setPlayerCheck] = useState([]);
  let location = useLocation();

  useEffect(() => {
    const grabData = async () => {
      const request = await axios.get(
        `https://api.opendota.com/api/players/${teamPlayerMoreID}/recentMatches?api_key=78245436-3d1d-40cf-b758-271be811c521`
      );
      setData(request.data);
    };
    if (pullDataStatus === false) {
      setPullDataStatus(true);
      grabData();
    }

    const handleSortData = () => {
      if (data) {
        const sortedData = sortData(data);
        setGoodStat(sortedData);
      }
    };
    handleSortData();
  }, [data]);

  const playerName = location.state.playerName;
  const teamName = location.state.teamName;
  const handleClick = (e) => {
    // FIX DUPLICATES ================================
    let playerDetail = {
      playerName,
      teamName,
      teamID,
      teamPlayerMoreID,
      ...e,
    };
    if (playerCheck.includes(playerDetail.teamPlayerMoreID)) {
      alert("Player already picked");
    } else {
      setPlayerCheck(playerDetail.teamPlayerMoreID);
      grabPlayerIntoFirebase(playerDetail);
      alert("player added");
    }
  };

  return (
    <div className="dataTContainer">
      <Card style={{ width: "900px", margin: "30px auto" }}>
        <DataTable
          theme="dark"
          title={location.state.playerName}
          columns={columns}
          data={goodStat}
          defaultSortField="totalWins"
          defaultSortAsc={false}
          pagination
          highlightOnHover={true}
          pointerOnHover={true}
          responsive={true}
          onRowClicked={(e) => handleClick(e)}
        />
      </Card>
    </div>
  );
};

export default TeamPlayerStatsMore;

function sortData(data) {
  let totalAvgKDA = 0; // return
  let totalGPM = 0;
  let totalXPM = 0;
  let totalLastHits = 0;
  let totalHeroDamage = 0;
  let totalWins = 0; // return
  let totalLost = 0; // return
  for (let i = 0; i < data.length; i++) {
    let totalKillAssist = parseInt(data[i].kills + data[i].assists);
    if (data[i].deaths > 0) {
      totalAvgKDA += totalKillAssist / parseInt(data[i].deaths);
    } else {
      totalAvgKDA += totalKillAssist;
    }
    totalGPM += parseInt(data[i].gold_per_min);
    totalXPM += parseInt(data[i].xp_per_min);
    totalLastHits += parseInt(data[i].last_hits);
    totalHeroDamage += parseInt(data[i].hero_damage);
    let team = "";
    if (parseInt(data[i].player_slot) < 128) {
      team = "radiant";
    } else {
      team = "dire";
    }
    if (team === "radiant" && data[i].radiant_win === true) {
      totalWins += 1;
    } else {
      totalLost += 1;
    }
  }
  let length = data.length;
  //  return
  let finalKDA = totalAvgKDA / length;
  let averageGPM = totalGPM / length;
  let averageXPM = totalXPM / length;
  let averageLastHits = totalLastHits / length;
  let averageHeroDamage = totalHeroDamage / length;
  let playerData = [
    {
      finalKDA,
      totalWins,
      totalLost,
      averageGPM,
      averageXPM,
      averageLastHits,
      averageHeroDamage,
    },
  ];
  return playerData;
}
