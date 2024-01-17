import '@/styles/Tutorial.css';
import { Accordion } from 'react-bootstrap';

export default function TechStack() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Individual Particle Settings</Accordion.Header>
        <Accordion.Body>
          {"Click on one of the particles to open up a tab that modifies the particle heat. There is an option to fix \
          the particle temp/heat so that it does not change. A fixed particle is still taken into account when calculating \
          particle heat of the next tick, but all attempted change to a fixed particle's heat will be voided. A fixed \
          particle has a black x across it."}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Color Scheme</Accordion.Header>
        <Accordion.Body style={{ whiteSpace: "pre-line" }}>
          Determines the color representation for different amount of heat a particle has. There are three color
          schemes to choose from.{'\n'}
          <strong>Infrared:</strong> default, simple, and intuitive.{'\n'}
          <strong>Star spectrun:</strong> notice that our sun is orange/red and hotter, bigger stars become white and than blue.
          Imagine the particles as little stars that have different temperature.{'\n'}
          <strong>Reveresed Star spectrun:</strong> hot is blue but cold is red - the star spectrum is rather counter-intuitive.
          Fear not, reversed star spectrum is here to save the day.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Tick Interval</Accordion.Header>
        <Accordion.Body>
          As mentioned, the simulation runs in discrete time, so tick interval determines how many miliseconds
          it takes for the simulation to run. For example, a tick interval of 1000 means that heat
          transfers between particles every 1 second. It is possible to set tick interval to a very small value,
          However, the actual simulation might not run as fast - it is capped by the performance of my code, JavaScript,
          your browser, and your computing device.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Heat Constant</Accordion.Header>
        <Accordion.Body>
          {"Linearly adjusts the rate of heat transfer between particles. Since the site hosts a discrete simulation \
          (like all simulations), the heat constant is suppose to be small, working together with a \
          small tick interval. A high heat constant is likely to break the simulation. Every particle checks 4 other \
          particles near it to update its heat. Let's say a very hot particle is surronded by 4 very cold particles.\
          Heat flows from the hot particle to the cold particles, and if the heat constant is too high too much heat \
          will be drawn and the hot particle can have negative temp. This then breaks the simulation."}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Heat Loss</Accordion.Header>
        <Accordion.Body>
          How much each particle losses heat per simulation tick. Note that the range of heat for particle is between
          0 and 21, so choose a value for heat loss wisely with respect to your chosen tick interval.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Presets</Accordion.Header>
        <Accordion.Body>
          Click on one of them to load a given arrangement of particles into the simulation. Explore and enjoy!
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header>Statistics</Accordion.Header>
        <Accordion.Body style={{ whiteSpace: "pre-line" }}>
          Simple statistical facts about particle heat{'\n'}
          <strong>Average Temp:</strong> average heat of all particles{'\n'}
          <strong>Standard Deviation</strong> standard deviation of the heat of all particles with respect to the average{'\n'}
          <strong>Temp Sum:</strong> sum of all particles{"'"} heat. with 0 heat loss and no particle with fixed temp, this 
          does not change.
          <strong>Tick Elapsed:</strong> how many tick has passed since the simulation started.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}