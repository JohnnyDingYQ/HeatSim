import { Modal, Nav } from "react-bootstrap"
import { useState } from 'react';

import '../styles/Introduction.css';

export default function Introduction({ show }) {

  const [tab, setTab] = useState("introduction");

  const handleNavClick = (eventKey) => {
    setTab(eventKey);
  };

  const getTabContent = () => {
    switch (tab) {
      case "introduction":
        return (
          "Hello World"
        );
    }
  };

  return (
    <Modal show={show} size="lg">
      <Modal.Header closeButton onHide={() => setSelectedParticle(null)}>
        <Modal.Title>
          Welcome to HeatSim!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav fill variant="tabs" defaultActiveKey="introduction" onSelect={handleNavClick}>
          <Nav.Item>
            <Nav.Link eventKey="introduction">Introduction</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tutorial">Tutorial</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tech-stack">Tech Stack</Nav.Link>
          </Nav.Item>
        </Nav>
        {getTabContent()}
      </Modal.Body>
    </Modal>
  );
}