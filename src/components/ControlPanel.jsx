import { Container, Col, Row, Dropdown, Form, Overlay, Tooltip } from "react-bootstrap"
import { Transition } from 'react-transition-group';
import { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/ControlPanel.css';

export default function ControlPanel({ setScheme, scheme, tickspeed, setTickspeed, heatConstant, setHeatConstant }) {

  const tickSpeedInput = useRef(null);
  const heatConstantInput = useRef(null);
  const [tickTooltipCode, setTickTooltipCode] = useState(0);
  const [heatConstantCode, setHeatConstantCode] = useState(0);

  return (
    <div className="control-panel-container">
      <Container>
        <Row>
          <Col className="title"><strong>HeatSim!</strong></Col>
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
            Tickspeed
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
                      id = setInterval(()=> {setTickTooltipCode(0); clearInterval(id)}, 2000);
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
                  ref = {heatConstantInput}
                  onBlur={
                    (e) => {
                      setHeatConstant(parseInt(e.target.value));
                      setHeatConstantCode(1);
                      let id;
                      id = setInterval(()=> {setHeatConstantCode(0); clearInterval(id)}, 2000);
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
                <Form.Text id="k-warning">
                  k over 0.7 can glitch the simulation
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        </Row>

      </Container>

    </div>
  )
}