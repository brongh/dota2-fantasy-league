import React, { useState, useEffect } from "react";
import axios from "axios";

import NewsEntry from "./NewsEntry";

import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron, Container, Row } from "react-bootstrap";

const NewHead = () => {
  const [data, setData] = useState([]);
  const [handleData, setHandleData] = useState(false);
  const [dataNews, setDataNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const request = await axios.get(
        `https://api.opendota.com/api/proMatches?api_key=78245436-3d1d-40cf-b758-271be811c521`
      );
      //console.log(request);
      setData(request.data);
    };
    if (handleData === false) {
      setHandleData(true);
      getData();
    }
    if (data.length > 0) {
      const newsData = showFourMatches(data);
      setDataNews(newsData);
    }
  }, [data]);
  return (
    <Jumbotron
      style={{
        height: "200px",
        paddingTop: "5px",
        paddingBottom: "10px",
        background: "rgba(0, 0,0,0.5)",
      }}
    >
      <Container>
        <Row>
          {dataNews.map((index) => (
            <NewsEntry value={index} key={index.matchID} />
          ))}
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default NewHead;

const showFourMatches = (data) => {
  let highLights = [];
  for (let i = 0; i < 4; i++) {
    let whoWon = "";
    if (data[i].radiant_win) {
      whoWon = data[i].radiant_name;
    } else {
      whoWon = data[i].dire_name;
    }
    const leagueName = data[i].league_name;
    const radiantName = data[i].radiant_name;
    const direName = data[i].dire_name;
    const matchID = data[i].match_id;
    let news = {
      leagueName,
      radiantName,
      direName,
      whoWon,
      matchID,
    };
    highLights.push(news);
  }
  return highLights;
};
