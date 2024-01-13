import { Container, Col, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/ControlPanel.css';

export default function ControlPanel({ temp,tempReducer,height,width,tickElapsed, children }) {

  
  return (
    <div className="control-panel-container">
      <Container>
        <Row>
          <Col className="title"><strong>HeatSim!</strong></Col>
        </Row>
        <Row className="tutorial">
          <Col><strong>Tutorial</strong>: Click on particle to set or fix temp.</Col>
        </Row>
        {children}
      </Container>

    </div>
  )
}