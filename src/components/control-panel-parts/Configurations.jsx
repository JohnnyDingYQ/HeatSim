import { Col, Row, Dropdown } from "react-bootstrap"

import ControlGroupTitle from '../ControlGroupTitle.jsx'

import "@/styles/Configurations.css"

export default function Configurations({ scheme, setScheme, children }) {

  return (
    <>
      <ControlGroupTitle title="Configurations" />
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
      {children}
    </>
  );
}