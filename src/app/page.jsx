'use client'

import { useState, useEffect, useReducer } from 'react';

import ParticleGrid from "../components/ParticleGrid.jsx";
import ControlPanel from "../components/ControlPanel.jsx";

import '../styles/index.css';

export default function MainContainer() {
  // initialize particle temperature as 2D array (react state)
  let WIDTH = 60;
  let HEIGHT = 50;
  let initialTemp = [...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0));

  // initialize particle grid
  let count = 0;
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      // introduce gradient
      initialTemp[i][j] = 21 / HEIGHT / WIDTH * count;
      count++;
    }
  }

  const [fixedTemp, setFixedTemp] = useState([...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0)));
  const [scheme, setScheme] = useState(2);
  const [tickspeed, setTickspeed] = useState(500);
  const [heatConstant, setHeatConstant] = useState(0.1);
  const [tickElapsed, setTickElapsed] = useState(0);

  const tempReducerDispatch = (temp, action) => {
    switch (action.type) {
      case 'replace': {
        return action.newTemp;
      }
      case 'preset-gradient': {
        // modifying temp state directly and storing it right back might cause problem
        // however, it surely saves space
        let count = 0;
        for (let i = 0; i < HEIGHT; i++) {
          for (let j = 0; j < WIDTH; j++) {
            temp[i][j] = 21 / HEIGHT / WIDTH * count;
            count++;
          }
        }
        // remove all fixed temp
        setFixedTemp([...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0)));
        return temp;
      }
      case 'preset-random': {
        for (let i = 0; i < HEIGHT; i++) {
          for (let j = 0; j < WIDTH; j++) {
            temp[i][j] = Math.random() * 21;
          }
        }
        // remove all fixed temp
        setFixedTemp([...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0)));
        return temp;
      }
      case 'preset-sun': {
        temp = [...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0));
        let cx = Math.floor(WIDTH/2);
        let cy = Math.floor(HEIGHT/2);
        let sunRadius = 10;
        for (let i = -sunRadius; i <= sunRadius; i++) {
          for (let j = -sunRadius; j <= sunRadius; j++) {
            if (Math.sqrt(i**2 + j**2) < sunRadius) {
              temp[cy + i][cx + j] = 21;
              fixedTemp[cy + i][cx + j]= 1;
            }
          }
        }
        setFixedTemp(fixedTemp);
        return temp;
      }
    }
  }

  const [temp, tempReducer] = useReducer(tempReducerDispatch, initialTemp);


  const handleTimeTick = () => {
    setTickElapsed(tickElapsed + 1);
    let newTemp = [...temp];
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        let delta = 0;
        if (i + 1 < HEIGHT) {
          delta = heatConstant * (temp[i][j] - temp[i + 1][j]);
          if (fixedTemp[i][j] != 1) {
            newTemp[i][j] -= delta;
          }
          if (fixedTemp[i + 1][j] != 1) {
            newTemp[i + 1][j] += delta;
          }
        }
        if (j + 1 < WIDTH) {
          delta = heatConstant * (temp[i][j] - temp[i][j + 1]);
          if (fixedTemp[i][j] != 1) {
            newTemp[i][j] -= delta;
          }
          if (fixedTemp[i][j + 1] != 1) {
            newTemp[i][j + 1] += delta;
          }
        }
      }
    }
    console.log(`Ticked with tickspeed ${tickspeed}`);
    tempReducer({
      type: 'replace',
      newTemp: newTemp
    })

  }

  useEffect(() => {
    const interval = setInterval(handleTimeTick, tickspeed);
    return () => {
      clearInterval(interval);
    };
  }, [tickspeed, heatConstant, temp]);


  return (
    <div className="main-container">
      <ControlPanel
        scheme={scheme}
        setScheme={setScheme}
        tickspeed={tickspeed}
        setTickspeed={setTickspeed}
        heatConstant={heatConstant}
        setHeatConstant={setHeatConstant}
        temp={temp}
        tempReducer={tempReducer}
        tickElapsed={tickElapsed}
        height={HEIGHT}
        width={WIDTH}
      />
      <ParticleGrid
        scheme={scheme}
        tickspeed={tickspeed}
        heatConstant={heatConstant}
        temp={temp}
        fixedTemp={fixedTemp}
        height={HEIGHT}
        width={WIDTH}
        setFixedTemp={setFixedTemp}
        tempReducer={tempReducer}
      />
    </div>
  )
}