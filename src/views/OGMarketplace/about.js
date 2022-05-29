import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";

export default function AboutPage() {
  const [iconTabs, setIconsTabs] = React.useState(1);

  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1" />
          <div className="squares square2" />
          <div className="squares square3" />
          <div className="squares square4" />
          <div className="squares square5" />
          <div className="squares square6" />
          <div className="squares square7" />
          <Container>
            <div className="title content-center">
              <h2 className="mb-3 title">
                Group B54 - B.Tech CSE Final Year Project
              </h2>
              <Row>
                <Col className="ml-auto mr-auto" md="10" xl="11">
                  <Card>
                    <CardHeader>
                      <Nav className="nav-tabs-info" role="tablist" tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: iconTabs === 1,
                            })}
                            onClick={(e) => setIconsTabs(1)}
                            href="#aboutnft"
                          >
                            <i
                              className="fa-solid fa-book"
                              style={{ "padding-right": "5px" }}
                            />
                            About
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: iconTabs === 2,
                            })}
                            onClick={(e) => setIconsTabs(2)}
                            href="#team"
                          >
                            <i
                              className="fa-solid fa-people-group"
                              style={{ "padding-right": "5px" }}
                            />
                            Our Team
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </CardHeader>
                    <CardBody>
                      <TabContent
                        className="tab-space"
                        activeTab={"link" + iconTabs}
                      >
                        <TabPane tabId="link1">
                          <img
                            src={require("assets/images/squaretrip.webp")}
                            style={{ width: "10%" }}
                            alt="..."
                          />
                          <br /> <br />
                          <p>
                            NFTs are taking the digital art and collectibles
                            work by storm. Digital artists are seeing their
                            lives change thanks to huge sales to a new audience.
                            They are used to represent ownership of any unique
                            asset, like a deed for an item in the digital or
                            physical realm.
                            <br />
                            <br />
                            Our project is a completely decentralized web3
                            application or DApp deployed on the ethereum
                            blockchain. It is a NFT marketplace where users can
                            buy, mint and sell artwork. Everything is
                            decentralized, even the uploaded files are stored on
                            IPFS which is a p2p network.
                          </p>
                        </TabPane>
                        <TabPane tabId="link2">
                          <img
                            src={require("assets/images/mitwpu_logo.png")}
                            style={{ width: "40%" }}
                            alt="..."
                          />
                          <br /> <br />
                          <p>
                            This application was made by the Students of MITWPU,
                            Pune
                            <br />
                            <br />
                            Adwait Kalsekar - 1032180431
                            <br />
                            Saurav Suresh - 1032181276
                            <br />
                            Kshitij Kapoor - 1032180734
                            <br />
                            Ranvijay Singh - 1032180568
                          </p>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
