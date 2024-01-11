import { useState, useEffect } from 'react';
import Particle from '../components/Particle.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/ParticleGrid.css';


export default function ParticleGrid(props) {
  let WIDTH = 70;
  let HEIGHT = 50;
  let HEAT_CONSTANT_K = 0.7;
  //initialize size
  const [size, setSize] = useState(0);

  let newTemp = [...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0));

  let count = 0;
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      newTemp[i][j] = 21 / HEIGHT / WIDTH * count;
      count++;
    }
  }
  const [temp, setTemp] = useState(newTemp);

  function handleTimeTick() {
    let newTemp = [...temp];
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        let delta = 0;
        if (i + 1 < HEIGHT) {
          delta = props.heatConstant * (temp[i][j] - temp[i + 1][j]);
          newTemp[i][j] -= delta;
          newTemp[i + 1][j] += delta;
        }
        if (j + 1 < WIDTH) {
          delta = props.heatConstant * (temp[i][j] - temp[i][j + 1]);
          newTemp[i][j] -= delta;
          newTemp[i][j + 1] += delta;
        }
      }
    }
    console.log(`Ticked with tickspeed ${props.tickspeed}`);
    // console.log([...newTemp]);
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


  return (
    <div className="particle-grid-container" >
      <div className="particle-grid" style={{ height: size * HEIGHT, width: size * WIDTH + 10 }}>
        {
          [...Array(WIDTH * HEIGHT)].map(
            (x, i) =>
              <Particle
                size={size}
                key={i}
                id={i}
                temp={temp[Math.floor(i / WIDTH)][i % WIDTH]}
                scheme={props.scheme}
              />
          )
        }
      </div>
    </div>
  )
}