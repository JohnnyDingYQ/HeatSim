import { Modal, Form, Button } from "react-bootstrap";
import { useState } from 'react';

import '../styles/ParticleSettings.css';

export default function ParticleSettings({ tempReducer, fixedTemp, setFixedTemp, selectedParticle, setSelectedParticle }) {

  const [invalidTemp, setInvalidTemp] = useState(0);

  const modifyParticleTemp = (e) => {
    e.preventDefault()
    let i = selectedParticle.i;
    let j = selectedParticle.j;
    const input = Object.fromEntries((new FormData(e.target)).entries());
    let target = input.temp;
    if (target !== "") {
      target = Number(target);
      if (target < 0.0 || target > 21.0) {
        setInvalidTemp(1);
        return;
      }
      tempReducer({
        type: 'modify',
        newTemp: target,
        i: i,
        j: j
      })
    }

    if (typeof input.fix != "undefined") {
      fixedTemp[i][j] = 1;
    } else {
      fixedTemp[i][j] = 0;
    }
    setFixedTemp(fixedTemp => fixedTemp);


    // Hide the prompt/modal
    setSelectedParticle(null);
  }


  const setCheckboxValue = () => {
    if (selectedParticle == null) {
      return false;
    }
    if (fixedTemp[selectedParticle.i][selectedParticle.j] == 1) {
      return true;
    }
    return false;
  }
  return (
    <Modal show={selectedParticle != null}>
      <Modal.Header closeButton onHide={() => setSelectedParticle(null)}>
        <Modal.Title >
          Settings for Particle #{selectedParticle != null ? selectedParticle.i*selectedParticle.width + selectedParticle.j : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={modifyParticleTemp}>
          <Form.Group className="mb-3">
            <Form.Label>Particle Temperature</Form.Label>
            <Form.Control name="temp" type="number" placeholder="Enter Temp" />
            <Form.Text style={{ paddingLeft: 4, color: invalidTemp === 0 ? 'rgba(33, 37, 41, 0.75)' : 'red' }}>
              Particle temp must be value between 0.0 and 21.0
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 checkbox" controlId="fixTemp">
            <Form.Check name="fix" type="checkbox" defaultChecked={setCheckboxValue()} label="Fix temp for this particle" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Apply
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}