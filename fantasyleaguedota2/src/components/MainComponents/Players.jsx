import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Team Name",
    selector: "team_name",
    sortable: true,
  },
];

const useGetData = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    async function getData() {
      const request = await axios.get(
        "https://api.opendota.com/api/proPlayers?api_key=78245436-3d1d-40cf-b758-271be811c521"
      );
      setTeamData(request.data);
      return request;
    }
    getData();
  }, []);
  console.log(teamData);
  return teamData;
};

const Players = () => {
  const dataSet = useGetData();
  return (
    <div className="dataTContainer">
      <Card style={{ width: "700px", margin: "30px auto" }}>
        <DataTable
          title="Professional Players"
          columns={columns}
          data={dataSet}
          defaultSortField="name"
          defaultSortAsc={false}
          sortIcon={<SortIcon />}
          pagination
          theme="dark"
        />
      </Card>
    </div>
  );
};

export default Players;
