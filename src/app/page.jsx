'use client'

import { useState, useEffect, useReducer } from 'react';
import { Form } from "react-bootstrap"

import ParticleGrid from "../components/ParticleGrid.jsx";
import ControlPanel from "../components/ControlPanel.jsx";
import Configurations from '../components/Configurations.jsx'
import Presets from '../components/Presets.jsx'
import Statistics from '../components/Statistics.jsx'
import ParticleSettings from '../components/ParticleSettings.jsx'
import ModifyParameter from '../components/ModifyParameter.jsx'

import '../styles/index.css';

export default function MainContainer() {
  // initialize particle temperature as 2D array (react state)
  let WIDTH = 60;
  let HEIGHT = 50;
  let MAX_TEMP = 21;
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
  const [heatLoss, setHeatLoss] = useState(0);
  const [tickElapsed, setTickElapsed] = useState(0);

  // if not null stores a object {i: i index, j: j index, width: width}
  // width is used to calculate particle number based on the i and j index
  const [selectedParticle, setSelectedParticle] = useState(null);


  const tempReducerDispatch = (temp, action) => {
    // modifying temp state directly and storing it right back might cause problem
    // however, it surely saves space
    switch (action.type) {
      case 'replace': {
        temp = action.newTemp;
        return temp;
      }
      case 'modify': {
        temp[action.i][action.j] = action.newTemp;
        return temp;
      }
      case 'preset-gradient': {
        let count = 0;
        for (let i = 0; i < HEIGHT; i++) {
          for (let j = 0; j < WIDTH; j++) {
            temp[i][j] = MAX_TEMP / HEIGHT / WIDTH * count;
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
            temp[i][j] = Math.random() * MAX_TEMP;
          }
        }
        // remove all fixed temp
        setFixedTemp([...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0)));
        return temp;
      }
      case 'preset-sun': {
        temp = [...Array(HEIGHT)].map(_ => Array(WIDTH).fill(0));
        let cx = Math.floor(WIDTH / 2);
        let cy = Math.floor(HEIGHT / 2);
        let sunRadius = 10;
        for (let i = -sunRadius; i <= sunRadius; i++) {
          for (let j = -sunRadius; j <= sunRadius; j++) {
            if (Math.sqrt(i ** 2 + j ** 2) < sunRadius) {
              temp[cy + i][cx + j] = MAX_TEMP;
              fixedTemp[cy + i][cx + j] = 1;
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
        // Apply heat conduction
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
        // Apply heat loss if temp not fixed
        if (fixedTemp[i][j] != 1) {
          newTemp[i][j] -= heatLoss;
          if (newTemp[i][j] < 0) {
            newTemp[i][j] = 0;
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
      <ControlPanel>
        <Configurations
          scheme={scheme}
          setScheme={setScheme}
        >
          <ModifyParameter name={'Tick Interval'} param={tickspeed} setParam={setTickspeed} />
          <ModifyParameter name={'Heat Constant'} param={heatConstant} setParam={setHeatConstant}>
            <Form.Text id="k-warning">
              Recommended &lt; 0.25
            </Form.Text>
          </ModifyParameter>
          <ModifyParameter name={'Heat Loss'} param={heatLoss} setParam={setHeatLoss} />
        </Configurations>
        <Presets tempReducer={tempReducer} />
        <Statistics temp={temp} width={WIDTH} height={HEIGHT} tickElapsed={tickElapsed} />
      </ControlPanel>

      <ParticleGrid
        scheme={scheme}
        temp={temp}
        fixedTemp={fixedTemp}
        height={HEIGHT}
        width={WIDTH}
        setSelectedParticle={setSelectedParticle}
      />

      {/* Floating Modal */}
      <ParticleSettings
        tempReducer={tempReducer}
        fixedTemp={fixedTemp}
        setFixedTemp={setFixedTemp}
        selectedParticle={selectedParticle}
        setSelectedParticle={setSelectedParticle}
      />
    </div>
  )
}