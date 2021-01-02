import React, { useState, useEffect } from "react";

import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";

const TeamPlayerStats = () => {
  const [data, setData] = useState([]);
  let { teamID } = useParams();
  //let url = useLocation();

  useEffect(() => {
    async function getData() {
      await axios
        .get(
          `https://api.opendota.com/api/teams/${teamID}/players?api_key=78245436-3d1d-40cf-b758-271be811c521`
        )
        .then((response) => setData(response.data));
    }
    getData();
  }, [teamID]);

  const location = useLocation();

  const columns = [
    {
      name: "Player Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <Link
          data-tag="allowRowEvents"
          to={{
            pathname: `${location.pathname}/players/${row.account_id}`,
            state: {
              playerName: row.name,
              teamName: location.state.teamName,
            },
          }}
        >
          {row.name}
        </Link>
      ),
    },
    {
      name: "Games Played",
      selector: "games_played",
      sortable: true,
    },
    {
      name: "Wins",
      selector: "wins",
      sortable: true,
    },
  ];

  return (
    <div className="dataTContainer">
      <Card
        style={{
          width: "700px",
          margin: "30px auto",
          background: "rgba(255,255,255,0.5)",
        }}
      >
        <DataTable
          theme="dark"
          title={`${location.state.teamName} players`}
          columns={columns}
          data={data}
          defaultSortField="games_played"
          defaultSortAsc={false}
          sortIcon={<SortIcon />}
          pagination
          highlightOnHover={true}
          pointerOnHover={true}
          keyField={data.account_id}
          responsive={true}
        />
      </Card>
    </div>
  );
};

export default TeamPlayerStats;
