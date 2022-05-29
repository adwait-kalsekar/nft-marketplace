import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
} from "reactstrap";

export default function OGNavbar({ web3Handler, account }) {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    web3Handler();
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>CAP🪨</span>
            NFT Marketplace
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by SKAR
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a
                  href="/home"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "white" }}
                >
                  CAP🪨
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem>
              <NavLink href="/trade">Trade</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/mint">Mint</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/items">Items</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/purchases">Purchases</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>

            <NavItem>
              {account ? (
                <>
                  <Button
                    className="nav-link d-lg-block"
                    color="primary"
                    // target="_blank"
                    // href="/profile"
                    id="tooltip999999999"
                    data-container="body"
                    data-content={account}
                    data-placement="bottom"
                    type="button"
                    style={{padding:"10px"}}
                  >
                    {account.slice(0, 5) + "..." + account.slice(38, 42)}
                  </Button>
                  <UncontrolledPopover
                    placement="bottom"
                    target="tooltip999999999"
                  >
                    <PopoverHeader>Wallet Address</PopoverHeader>
                    <PopoverBody>
                      {account}
                      <br />
                      view in etherscan{" "}
                      <a
                        href={"https://rinkeby.etherscan.io/address/" + account}
                      >
                        here
                      </a>
                    </PopoverBody>
                  </UncontrolledPopover>
                  <div className="clearfix" />
                </>
              ) : (
                <Button
                  onClick={web3Handler}
                  className="nav-link d-lg-block"
                  color="primary"
                  style={{padding:"10px"}}
                >
                  <i className="tim-icons icon-spaceship" /> Connect Wallet
                </Button>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
