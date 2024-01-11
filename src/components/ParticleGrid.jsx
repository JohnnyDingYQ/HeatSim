import { useState, useEffect } from 'react';
import { Modal, Form, Button } from "react-bootstrap"

import Particle from '../components/Particle.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ParticleGrid.css';


export default function ParticleGrid(props) {
  let WIDTH = 60;
  let HEIGHT = 50;
  // initialize individual particle size as state
  const [size, setSize] = useState(0);

  let newTemp = [...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0));

  // initialize particle grid
  let count = 0;
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      // introduce gradient
      newTemp[i][j] = 21 / HEIGHT / WIDTH * count;
      count++;
    }
  }

  // initialize particle temperature as 2D array (react state)
  const [temp, setTemp] = useState(newTemp);
  const [fixedTemp, setFixedTemp] = useState([...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0)));

  // -1 means not particle is selected and the prompt/modal will not show
  const [selectedParticle, setSelectedParticle] = useState(-1);
  const [invalidTemp, setInvalidTemp] = useState(0);


  function handleTimeTick() {
    let newTemp = [...temp];
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        let delta = 0;
        if (i + 1 < HEIGHT) {
          delta = props.heatConstant * (temp[i][j] - temp[i + 1][j]);
          if (fixedTemp[i][j] != 1) {
            newTemp[i][j] -= delta;
          }
          if (fixedTemp[i + 1][j] != 1) {
            newTemp[i + 1][j] += delta;
          }
        }
        if (j + 1 < WIDTH) {
          delta = props.heatConstant * (temp[i][j] - temp[i][j + 1]);
          if (fixedTemp[i][j] != 1) {
            newTemp[i][j] -= delta;
          }
          if (fixedTemp[i][j + 1] != 1) {
            newTemp[i][j + 1] += delta;
          }
        }
      }
    }
    console.log(`Ticked with tickspeed ${props.tickspeed}`);
    // console.log(fixedTemp);
    setTemp(temp => newTemp);

  }

  function handleResize() {
    // setSize(size => Math.min(window.innerHeight / HEIGHT, (window.innerWidth-400) / WIDTH));
    // 2
    setSize(size => window.innerHeight / HEIGHT);
  }

  useEffect(() => {
    const interval = setInterval(handleTimeTick, props.tickspeed);
    return () => {
      clearInterval(interval);
    };
  }, [props.tickspeed, props.heatConstant]);

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
    const input = Object.fromEntries((new FormData(e.target)).entries())
    console.log(input);
    let target = Number(input.temp);
    let i = Math.floor(selectedParticle / WIDTH);
    let j = selectedParticle % WIDTH;
    if (target != '') {
      if (target < 0.0 || target > 21.0) {
        setInvalidTemp(1);
        return;
      }
      // newTemp = [...temp];
      temp[i][j] = target;
      setTemp(temp => temp);
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
            <Form.Group className="mb-3 test" controlId="fixTemp">
              <Form.Check name="fix" type="checkbox" label="Fix temp for this particle" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Apply
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="particle-grid" style={{ height: size * HEIGHT, width: size * WIDTH + 10 }}>
        {
          // Traverse through temp 2D array, inserting indiviual particles
          [...Array(WIDTH * HEIGHT)].map(
            (x, i) =>
              <Particle
                size={size}
                key={i}
                temp={temp[Math.floor(i / WIDTH)][i % WIDTH]}
                scheme={props.scheme}
                selectParticle={() => selectParticle(i)}
              />
          )
        }
      </div>
    </div>
  )
}