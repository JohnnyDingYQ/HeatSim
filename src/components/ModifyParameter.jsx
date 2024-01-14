import { Col, Row, Form, Overlay, Tooltip } from "react-bootstrap"
import { useRef, useState } from 'react';

import '../styles/ModifyParameter.css';

export default function ModifyParameter({ name, param, setParam, children }) {

  const input = useRef(null);
  const [showTooltip, setShowTooltip] = useState(0);

  return (
    <Row className="option">
      <Col className="option-title">
        {name}
      </Col>
      <Col xs={8}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              ref={input}
              onBlur=
              {
                (e) => {
                  setParam(e.target.value);
                  setShowTooltip(1);
                  let id;
                  id = setInterval(() => { setShowTooltip(0); clearInterval(id) }, 2000);
                }
              }
              defaultValue={param}
              size="sm"
              type="number"
              placeholder="ms"
            />
            <Overlay target={input.current} show={showTooltip} placement="right">
              {(props) => (
                <Tooltip id={`${name}-tooltip`} {...props}>
                  {name} set to {param}
                </Tooltip>
              )}
            </Overlay>
            {children}
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}