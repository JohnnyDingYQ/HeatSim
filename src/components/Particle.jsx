import OverlayTrigger from 'react-bootstrap/cjs/OverlayTrigger.js';
import Tooltip from 'react-bootstrap/cjs/Tooltip.js';

import '../styles/style.css';

export default function Particle({ size, temp, scheme }) {

  // https://stackoverflow.com/questions/21977786/star-b-v-color-index-to-apparent-rgb-color/22630970#22630970
  function bv2rgb(bv) {
    if (bv < -0.40) bv = -0.40;
    if (bv > 2.00) bv = 2.00;

    let r = 0.0;
    let g = 0.0;
    let b = 0.0;

    if (-0.40 <= bv && bv < 0.00) {
      let t = (bv + 0.40) / (0.00 + 0.40);
      r = 0.61 + (0.11 * t) + (0.1 * t * t);
    } else if (0.00 <= bv && bv < 0.40) {
      let t = (bv - 0.00) / (0.40 - 0.00);
      r = 0.83 + (0.17 * t);
    } else if (0.40 <= bv && bv < 2.10) {
      let t = (bv - 0.40) / (2.10 - 0.40);
      r = 1.00;
    }

    if (-0.40 <= bv && bv < 0.00) {
      let t = (bv + 0.40) / (0.00 + 0.40);
      g = 0.70 + (0.07 * t) + (0.1 * t * t);
    } else if (0.00 <= bv && bv < 0.40) {
      let t = (bv - 0.00) / (0.40 - 0.00);
      g = 0.87 + (0.11 * t);
    } else if (0.40 <= bv && bv < 1.60) {
      let t = (bv - 0.40) / (1.60 - 0.40);
      g = 0.98 - (0.16 * t);
    } else if (1.60 <= bv && bv < 2.00) {
      let t = (bv - 1.60) / (2.00 - 1.60);
      g = 0.82 - (0.5 * t * t);
    }

    if (-0.40 <= bv && bv < 0.40) {
      let t = (bv + 0.40) / (0.40 + 0.40);
      b = 1.00;
    } else if (0.40 <= bv && bv < 1.50) {
      let t = (bv - 0.40) / (1.50 - 0.40);
      b = 1.00 - (0.47 * t) + (0.1 * t * t);
    } else if (1.50 <= bv && bv < 1.94) {
      let t = (bv - 1.50) / (1.94 - 1.50);
      b = 0.63 - (0.6 * t * t);
    }
    // console.log(b);
    r = r * 255;
    g = g * 255;
    b = b * 255;
    return [r, g, b];
  }

  let particle;
  if (scheme == 0) {
    let [r, g, b] = bv2rgb(-0.8667 + 0.1556 * temp);
    particle = (
      <div className="particle" style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}></div>
    )
  } else if (scheme == 1) {
    let [r, g, b] = bv2rgb(2.867 - 0.1556 * temp);
    particle = (
      <div className="particle" style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}></div>
    )
  } else if (scheme == 2) {
    let h = temp/21*256;
    particle = (
      <div className="particle" style={{ backgroundColor: `hsl(${h}, 100%, 50%)` }}></div>
    )
  }

  return (

    <OverlayTrigger
      placement='auto'
      overlay={
        (props) => (
          <Tooltip id="overlay-example" {...props}>
            Temp: {Math.round(temp * 100) / 100}
          </Tooltip>
        )}>
      <div className="particle-container" style={{ height: size, width: size }}>
        {particle}
      </div>
    </OverlayTrigger>
  );




}