import { Col, Row, Form, Overlay, Tooltip } from "react-bootstrap"
import { useRef, useState } from 'react';

import '../styles/ModifyParameter.css';

export default function ModifyParameter({ name, param, setParam, children }) {

  const input = useRef(null);
  const [showTutorial, setShowTutorial] = useState(0);
  const [success, setSuccess] = useState(0);

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
              onFocus={() => setShowTutorial(1)}
              onBlur=
              {
                (e) => {
                  setShowTutorial(0);
                  setParam(e.target.value);
                  setSuccess(1);
                  let id;
                  id = setInterval(() => { setSuccess(0); clearInterval(id) }, 2000);
                }
              }
              defaultValue={param}
              size="sm"
              type="number"
              placeholder="ms"
            />
            <Overlay target={input.current} show={success} placement="right">
              {(props) => (
                <Tooltip className="success" id={`${name}-success`} {...props}>
                  {name} set to {param}
                </Tooltip>
              )}
            </Overlay>
            <Overlay target={input.current} show={showTutorial} placement="right">
              {(props) => (
                <Tooltip className="tutorial" id={`${name}-tutorial`} {...props}>
                  {children}
                </Tooltip>
              )}
            </Overlay>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
}