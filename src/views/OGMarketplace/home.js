import React from "react";
// react plugin used to create charts
// import { Line } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  // Card,
  // CardHeader,
  // CardBody,
  // CardFooter,
  // CardTitle,
  // ListGroupItem,
  // ListGroup,
  // Container,
  Row,
  Col,
} from "reactstrap";

// core components

import Footer from "components/Footer/Footer.js";

export default function HomePage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  BUY SOME COOL STUFF!
                  <br />
                  <h3>collect fun items!🥳</h3>
                </h1>

                <p className="text-white mb-3">
                  The NFT Marketplace of your dreams is HERE! We've made it
                  extremely simple and intuitive for you to mint and trade nfts.
                  Login with your metamask wallet and get started now!!
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Only 1% market fees!
                  </p>
                  <Button
                    className="btn-link"
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
                <div className="btn-wrapper">
                  <div className="button-container">
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="https://www.linkedin.com/in/saurav-suresh-6ab7521b5/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h1>S</h1>
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="https://www.linkedin.com/in/kshitij-kapoor-39b280170/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h1>K</h1>
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="https://www.linkedin.com/in/adwait-k-3413031b4/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h1>A</h1>
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="https://www.linkedin.com/in/ranvijay-singh-godhara-981648193/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h1>R</h1>
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/inr_fly.png")}
                />
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
