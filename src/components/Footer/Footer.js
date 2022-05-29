import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">CAP🪨</h1>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink to="/home" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/trade" tag={Link}>
                  Trade
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/mint" tag={Link}>
                  Mint
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/items" tag={Link}>
                  Items
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink href="/purchases">
                  Purchases
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://opensource.org/licenses/MIT">
                  License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="title">Follow us:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.linkedin.com/in/saurav-suresh-6ab7521b5/"
                id="tooltip622135962"
                target="_blank"
              >
                <h1>S</h1>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow Saurav Suresh
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.linkedin.com/in/kshitij-kapoor-39b280170/"
                id="tooltip230450801"
                target="_blank"
              >
                <h1>K</h1>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Follow Khshitij Kapoor
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.linkedin.com/in/adwait-k-3413031b4/"
                id="tooltip318450378"
                target="_blank"
              >
                <h1>A</h1>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow Adwait Kalsekar
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.linkedin.com/in/ranvijay-singh-godhara-981648193/"
                id="tooltip987423407"
                target="_blank"
              >
                <h1>R</h1>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip987423407">
                Follow Ranvijay Singh
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
