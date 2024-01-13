import { Container, Col, Row, Dropdown, Form, Overlay, Tooltip, Button } from "react-bootstrap"
import { Transition } from 'react-transition-group';
import { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/ControlPanel.css';

export default function ControlPanel(
  {
    setScheme,
    scheme,
    tickspeed,
    setTickspeed,
    heatConstant,
    setHeatConstant,
    temp,
    tempReducer,
    height,
    width,
    tickElapsed
  }
) {

  const tickSpeedInput = useRef(null);
  const heatConstantInput = useRef(null);
  const [tickTooltipCode, setTickTooltipCode] = useState(0);
  const [heatConstantCode, setHeatConstantCode] = useState(0);

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
    <div className="control-panel-container">
      <Container>
        <Row>
          <Col className="title"><strong>HeatSim!</strong></Col>
        </Row>
        <Row className="tutorial">
          <Col><strong>Tutorial</strong>: Click on particle to set or fix temp.</Col>
        </Row>
        <Row>
          <Col className="section-title">Configurations</Col>
        </Row>
        <Row className="option" style={{ marginBottom: 13 }}>
          <Col style={{ paddingTop: 5 }}>
            Color Scheme
          </Col>
          <Col xs={8}>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {(scheme === 0) ? 'Star Spectrum Reversed' : (scheme === 1) ? 'Star Spectrum' : 'Infrared'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setScheme(0)} href="">Star Spectrum Reversed</Dropdown.Item>
                <Dropdown.Item onClick={() => setScheme(1)} href="">Star Spectrum</Dropdown.Item>
                <Dropdown.Item onClick={() => setScheme(2)} href="">Infrared</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="option">
          <Col >
            Tick Interval
          </Col>
          <Col xs={8}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  ref={tickSpeedInput}
                  onBlur=
                  {
                    (e) => {
                      setTickspeed(e.target.value);
                      setTickTooltipCode(1);
                      let id;
                      id = setInterval(() => { setTickTooltipCode(0); clearInterval(id) }, 2000);
                    }
                  }
                  defaultValue={tickspeed}
                  size="sm"
                  type="number"
                  placeholder="ms"
                />
                <Overlay target={tickSpeedInput.current} show={tickTooltipCode} placement="right">
                  {(props) => (
                    <Tooltip id="button-tooltip" {...props}>
                      Tickspeed set to {tickspeed}
                    </Tooltip>
                  )}
                </Overlay>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="option">
          <Col>
            Conductivity Constant
          </Col>
          <Col xs={8}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  ref={heatConstantInput}
                  onBlur={
                    (e) => {
                      setHeatConstant(e.target.value);
                      setHeatConstantCode(1);
                      let id;
                      id = setInterval(() => { setHeatConstantCode(0); clearInterval(id) }, 2000);
                    }
                  }
                  defaultValue={heatConstant}
                  size="sm"
                  type="number"
                  placeholder="ms"
                />
                <Overlay target={heatConstantInput.current} show={heatConstantCode} placement="right">
                  {(props) => (
                    <Tooltip id="button-tooltip" {...props}>
                      Heat Constant set to {heatConstant}
                    </Tooltip>
                  )}
                </Overlay>
                <Form.Text id="k-warning" style={{ textAlign: 'left' }}>
                  Recommended k &lt; 0.25
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="section-title">Presets</Col>
        </Row>
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
        <Row>
          <Col className="section-title" style={{ marginTop: 20 }}>Statistics</Col>
        </Row>
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
      </Container>

    </div>
  )
}