import React from "react";
import { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Container,
  Row,
  Col,
  CardText,
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";

// web3 imports
import { ethers } from "ethers";

function renderSoldItems(items) {
  return (
    <>
      <h2>Sold Items</h2>
      <Row xs={1} md={2} lg={4}>
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card className="card-register">
              <CardImg
                alt="..."
                variant="top"
                src={item.image}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "250px",
                  "object-fit": "cover",
                }}
              />
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
              </CardBody>
              <CardFooter style={{ "margin-top": "0px" }}>
                <CardText
                  className="title text-primary"
                  style={{
                    "margin-top": "0px",
                    "margin-bottom": "0px",
                  }}
                >
                 Sold for {ethers.utils.formatEther(item.totalPrice)} ETH <br />
                  Recieved {ethers.utils.formatEther(item.price)} ETH
                </CardText>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <h2 className="App-loader">Sold</h2>
      <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card className="Card">
              <Card.Img variant="top" src={item.image} />
              <Card.Footer className="Card-text">
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved{" "}
                {ethers.utils.formatEther(item.price)} ETH
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row> */}
    </>
  );
}

export default function ItemsPage({ marketplace, nft, account }) {
  const [squares1to6, setSquares1to6] = React.useState("");

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
  };

  // web3 -------------------------------------------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [time, setTime] = useState(false);
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          owner: i.owner,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
    setLoading(false);
    setListedItems(listedItems);
    setSoldItems(soldItems);
  };
  useEffect(() => {
    loadListedItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  setTimeout(() => setTime(true), 10000);
  if (loading && !time)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2 style={{ padding: "100px" }}>Loading...</h2>
      </main>
    );
  else if (loading && time)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2 style={{ padding: "100px" }}>Loading...</h2>
        <h5>(Check if metamask network is configured correctly)</h5>
      </main>
    );

  // ------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="wrapper">
        <div className="page-header" style={{ "max-height": "100%" }}>
          <div className="page-header-image" />
          <div className="content">
            {listedItems.length > 0 ? (
              <Container>
                <h2>Listed Items</h2>
                <Row xs={1} md={2} lg={4}>
                  {listedItems.map((item, idx) => (
                    <Col key={idx} className="overflow-hidden">
                      <Card className="card-register">
                        <CardImg
                          alt="..."
                          variant="top"
                          src={item.image}
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "250px",
                            "object-fit": "cover",
                            "margin-left":"0px"
                          }}
                        />
                        <CardBody>
                          <CardTitle>{item.name}</CardTitle>
                          <CardText>{item.description}</CardText>
                        </CardBody>
                        <CardFooter style={{ "margin-top": "0px" }}>
                          <CardText
                            className="title text-primary"
                            style={{
                              "margin-top": "0px",
                              "margin-bottom": "0px",
                            }}
                          >
                            {ethers.utils.formatEther(item.totalPrice)} ETH
                          </CardText>
                        </CardFooter>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: squares1to6 }}
                />
                {soldItems.length > 0 && renderSoldItems(soldItems)}
              </Container>
            ) : (
              <Container>
                <h2 className="App-loader">
                  You have not minted any Digital Assets yet
                </h2>
                <h4>
                  You can Create and Sell your own NFT's{" "}
                  <a href="/mint">here</a>
                </h4>
              </Container>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
