import { useState, useEffect } from 'react';

import Particle from '../components/Particle.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ParticleGrid.css';


export default function ParticleGrid({ scheme, temp, fixedTemp, height, width, setSelectedParticle }) {
  // initialize individual particle size as state
  const [size, setSize] = useState(0);

  // -1 means not particle is selected and the prompt/modal will not show


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


  return (
    <div className="particle-grid-container" >
      <div className="particle-grid" style={{ height: size * height, width: size * width + 10 }}>
        {
          // Traverse through temp 2D array, inserting indiviual particles
          [...Array(width * height)].map(
            (x, index) => {
              let i = Math.floor(index / width);
              let j = index % width;
              return (
                <Particle
                  size={size}
                  key={i}
                  temp={temp[i][j]}
                  fixed={fixedTemp[i][j] == 1 ? true : false}
                  scheme={scheme}
                  selectParticle={() => setSelectedParticle({i: i, j: j, width: width})}
                />);
            }
          )
        }
      </div>
    </div>
  )
}