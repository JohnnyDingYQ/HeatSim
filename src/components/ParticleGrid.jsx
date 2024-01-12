import { useState, useEffect } from 'react';
import { Modal, Form, Button } from "react-bootstrap"

import Particle from '../components/Particle.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ParticleGrid.css';


export default function ParticleGrid({scheme, temp, fixedTemp, height, width, setFixedTemp, tempReducer}) {
  // initialize individual particle size as state
  const [size, setSize] = useState(0);

  // -1 means not particle is selected and the prompt/modal will not show
  const [selectedParticle, setSelectedParticle] = useState(-1);
  const [invalidTemp, setInvalidTemp] = useState(0);

  function handleResize() {
    setSize(size => window.innerHeight / height);
  }

  useEffect(() => {
    // anoynomus function that handles particle alignment base on the resized browsefr window
    handleResize(); //run it once so that the page loads correctly
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const modifyParticleTemp = (e) => {
    e.preventDefault()
    let i = Math.floor(selectedParticle / width);
    let j = selectedParticle % width;
    const input = Object.fromEntries((new FormData(e.target)).entries())
    let target = Number(input.temp);
    if (target != '') {
      if (target < 0.0 || target > 21.0) {
        setInvalidTemp(1);
        return;
      }
      // newTemp = [...temp];
      temp[i][j] = target;
      tempReducer({
        type: 'replace',
        newTemp: temp
      })
    }

    if (typeof input.fix != "undefined") {
      fixedTemp[i][j] = 1;
    } else {
      fixedTemp[i][j] = 0;
    }
    setFixedTemp(fixedTemp => fixedTemp);


    // Hide the prompt/modal
    setSelectedParticle(-1);
  }

  const selectParticle = (i) => {
    setSelectedParticle(i);
  }

  const setCheckboxValue = () => {
    if (selectedParticle == -1) {
      return false;
    }
    let i = Math.floor(selectedParticle / width);
    let j = selectedParticle % width;
    let n = [...fixedTemp]
    if (fixedTemp[i][j] == 1) {
      return true;
    }
    return false;
  }

  return (
    <div className="particle-grid-container" >
      <Modal show={selectedParticle != -1}>
        <Modal.Header closeButton onHide={() => setSelectedParticle(-1)}>
          <Modal.Title >
            Settings for Particle #{selectedParticle}
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
      <div className="particle-grid" style={{ height: size * height, width: size * width + 10 }}>
        {
          // Traverse through temp 2D array, inserting indiviual particles
          [...Array(width * height)].map(
            (x, i) =>
              <Particle
                size={size}
                key={i}
                temp={temp[Math.floor(i / width)][i % width]}
                fixed={fixedTemp[Math.floor(i / width)][i % width] == 1 ? true : false}
                scheme={scheme}
                selectParticle={() => selectParticle(i)}
              />
          )
        }
      </div>
    </div>
  )
}