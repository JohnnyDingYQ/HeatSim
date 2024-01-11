import { Container, Col, Row, Dropdown, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/style.css';

export default function ControlPanel({ setScheme, scheme, tickspeed, setTickspeed, heatConstant, setHeatConstant }) {

  return (
    <div className="control-panel-container">
      <Container>
        <Row>
          <Col className="title"><strong>HeatSim!</strong></Col>
        </Row>
        <Row>
          <Col className="option-text" style={{ paddingTop: 5 }}>
            Color Scheme
          </Col>
          <Col className="option" xs={8}>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {(scheme === 0) ? 'Star Spectrum' : (scheme === 1) ? 'Star Spectrum Reversed' : 'Infrared'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setScheme(0)} href="">Star Spectrum</Dropdown.Item>
                <Dropdown.Item onClick={() => setScheme(1)} href="">Star Spectrum Reversed</Dropdown.Item>
                <Dropdown.Item onClick={() => setScheme(2)} href="">Infrared</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="option-text">
            Tickspeed
          </Col>
          <Col className="option" xs={8}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  onBlur=
                  {
                    (e) => setTickspeed(parseInt(e.target.value))
                  }
                  defaultValue={tickspeed}
                  size="sm"
                  type="number"
                  placeholder="ms"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="option-text">
            Conductivity Constant
          </Col>
          <Col className="option" xs={8}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  onBlur={
                    (e) => setHeatConstant(parseInt(e.target.value))
                  }
                  defaultValue={heatConstant}
                  size="sm"
                  type="number"
                  placeholder="ms"
                />
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