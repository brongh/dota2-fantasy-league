import React from "react";
import { Col, Card } from "react-bootstrap";

const NewsEntry = ({ value }) => {
  return (
    <Col>
      <Card
        variant="light"
        style={{
          width: "222px",
          height: "185px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "white",
          border: "4px solid grey",
        }}
        className="mb-2"
      >
        <Card.Header
          style={{
            height: "50px",
            paddingTop: 0,
            fontSize: "14px",
            fontWeight: "bold",
            color: "orange",
          }}
        >
          {value.leagueName}
        </Card.Header>
        <Card.Body style={{ padding: "1px 3px", textAlign: "left" }}>
          <Card.Title style={{ fontSize: "14px" }}>
            {value.radiantName}
          </Card.Title>
          <Card.Title style={{ fontSize: "14px" }}>{value.direName}</Card.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                height: "50px",
                width: "170px",
                border: "1px solid grey",
                margin: "0 auto",
              }}
            >
              {value.whoWon}{" "}
              <span style={{ color: "orange", fontWeight: "bold" }}>WON</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewsEntry;
