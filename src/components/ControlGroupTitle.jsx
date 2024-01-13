import { Col, Row } from "react-bootstrap"

import '../styles/ControlGroupTitle.css';

export default function ControlGroupTitle({ title }) {
  return (
    <Row>
      <Col className="section-title">{title}</Col>
    </Row>
  );
}