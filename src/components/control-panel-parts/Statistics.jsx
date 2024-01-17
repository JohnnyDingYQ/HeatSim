import { Col, Row } from "react-bootstrap"

import ControlGroupTitle from '../ControlGroupTitle.jsx'

import '@/styles/Statistics.css';

export default function Statistics({ temp, height, width, tickElapsed }) {

  let sum = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      sum += temp[i][j];
    }
  }
  let average = sum / height / width;

  let sd = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      sd += (temp[i][j] - average) ** 2;
    }
  }
  sd = Math.sqrt(sd / height / width);

  return (
    <>
      <ControlGroupTitle title="Statistics" />
      <Row className="stats">
        <Col>
          <p>Average Temp:</p>
          <span>{Math.round(average * 100) / 100}</span> </Col>
        <Col>
          <p>Standard Deviation:</p>
          <span>{Math.round(sd * 100) / 100}</span></Col>
      </Row>
      <Row className="stats">
        <Col>
          <p>Temp Sum:</p>
          <span>{Math.round(sum * 100) / 100}</span>
        </Col>
        <Col>
          <p>Tick Elapsed:</p>
          <span>{tickElapsed}</span>
        </Col>
      </Row>
    </>
  );
}