'use client'

import { useState } from 'react';

import ParticleGrid from "../components/ParticleGrid.jsx";
import ControlPanel from "../components/ControlPanel.jsx";

import '../styles/index.css';

export default function MainContainer() {

  const [scheme, setScheme] = useState(0);
  const [tickspeed, setTickspeed] = useState(1000);
  const [heatConstant, setHeatConstant] = useState(0.1);

  return (
    <div className="main-container">
      <ControlPanel
        scheme={scheme}
        setScheme={setScheme}
        tickspeed={tickspeed}
        setTickspeed={setTickspeed}
        heatConstant={heatConstant}
        setHeatConstant={setHeatConstant}
      />
      <ParticleGrid
        scheme={scheme}
        tickspeed={tickspeed}
        heatConstant={heatConstant}
      />
    </div>
  )
}