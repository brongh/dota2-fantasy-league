import React, { useState, useEffect } from "react";
//import "../../styles.css";

import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";
import { Link } from "react-router-dom";

const useGetData = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    async function getData() {
      const request = await axios.get(
        "https://api.opendota.com/api/teams?api_key=78245436-3d1d-40cf-b758-271be811c521"
      );
      setTeamData(request.data);
      return request;
    }
    getData();
  }, []);
  console.log(teamData);
  return teamData;
};

const Teams = () => {
  const dataSet = useGetData();

  const columns = [
    {
      name: "Team Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <Link
          data-tag="allowRowEvents"
          to={{
            pathname: `/teams/${row.team_id}`,
            state: {
              teamName: row.name,
            },
          }}
        >
          {row.name}
        </Link>
      ),
    },
    {
      name: "Team Rating",
      selector: "rating",
      sortable: true,
    },
    {
      name: "Wins",
      selector: "wins",
      sortable: true,
    },
    {
      name: "Losses",
      selector: "losses",
      sortable: true,
    },
    {
      name: "Last Match",
      selector: "last_match_time",
      sortable: true,
      right: true,
    },
  ];

  //
  return (
    <div className="dataTContainer">
      <Card style={{ width: "700px", margin: "30px auto" }}>
        <DataTable
          theme="dark"
          title="Professional Team Data"
          columns={columns}
          data={dataSet}
          defaultSortField="rating"
          defaultSortAsc={false}
          sortIcon={<SortIcon />}
          pagination
          highlightOnHover={true}
          pointerOnHover={true}
          keyField={dataSet.team_id}
          responsive={true}
        />
      </Card>
    </div>
  );
};

export default Teams;
// onRowClicked={(event) => routeChange(event)}
/* {handleClick ? <Redirect to={{ pathname: `/teams/${teamID}` }} /> : null} */
//
