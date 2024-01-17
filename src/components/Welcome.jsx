import { Button, Form, Modal, Nav } from "react-bootstrap"
import { useState } from 'react';

import '../styles/Welcome.css';

import Introduction from "./introduction_tabs/Introduction";
import Tutorial from "./introduction_tabs/Tutorial";
import TechStack from "./introduction_tabs/TechStack";

export default function Welcome({ show, setShowWelcome }) {

  const [tab, setTab] = useState("introduction");

  const handleClose = (e) => {
    e.preventDefault()
    const input = Object.fromEntries((new FormData(e.target)).entries());

    if (typeof input.notAgain != "undefined") {
    } else {
    }
    setShowWelcome(0);
  }


  const handleNavClick = (eventKey) => {
    setTab(eventKey);
  };

  const getTabContent = () => {
    switch (tab) {
      case "introduction":
        return (
          <Introduction />
        );
      case "tech-stack":
        return (
          <TechStack />
        );
      case "tutorial":
        return (
          <Tutorial />
        );
    }
  };

  return (
    <Modal show={show} size="lg">
      <Modal.Header>
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
        <div className="tab-container">
          {getTabContent()}
        </div>
        <div className="close-welcome">
          <Form onSubmit={handleClose}>
            {/* <Form.Group className="mb-3 checkbox">
              <Form.Check name="notAgain" type="checkbox" label="Do not show again" />
            </Form.Group> */}
            <div className="button-container">
              <Button variant="primary" type="submit">Close</Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}