import { Col, Row, Button } from "react-bootstrap"

import ControlGroupTitle from '../ControlGroupTitle.jsx'

import '@/styles/Presets.css';

export default function Presets({ tempReducer }) {

  const handleGradient = () => {
    tempReducer({
      type: 'preset-gradient'
    });
  }

  const handleRandom = () => {
    tempReducer({
      type: 'preset-random'
    });
  }

  const handleSun = () => {
    tempReducer({
      type: 'preset-sun'
    });
  }

  return (
    <>
      <ControlGroupTitle title="Presets" />
      <Row className="justify-content-sm-center">
        <Col className="text-center">
          <Button variant="info" onClick={handleGradient}>Gradient</Button>
        </Col>
        <Col className="text-center">
          <Button variant="light" onClick={handleRandom}>Random</Button>
        </Col>
        <Col className="text-center" onClick={handleSun}>
          <Button variant="warning">&nbsp;&nbsp;Sun&nbsp;&nbsp;</Button>
        </Col>
      </Row>
    </>
  );
}