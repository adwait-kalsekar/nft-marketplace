import React from "react";
import { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
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

export default function PurchasesPage({ marketplace, nft, account }) {
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
  const [purchases, setPurchases] = useState([]);
  const [time, setTime] = useState(false);
  const [address, setAddress] = useState("");
  // const [sellingprice, setSellingprice]= useState(0);

  const loadPurchasedItems = async () => {
    const itemCount = await marketplace.itemCount();
    let purchases = [];
    setAddress(account);
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (
        item.owner.toString().toLowerCase() ===
          account.toString().toLowerCase() &&
        item.sold
      ) {
        console.log("item.owner", item.owner.toString().toLowerCase());
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        purchases.push({
          totalPrice,
          price: item.price,
          itemId: item.itemId,
          sold: item.sold,
          seller: item.seller,
          owner: item.owner,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    console.log(purchases);
    console.log(address);
    setLoading(false);
    setPurchases(purchases);
  };

  const sellNFT = async (item) => {
    console.log(`item.price: ${item.price}`);
    //item.price += (10/100) * item.price
    //console.log(`item.price: ${item.price}`)
    const listingPrice =
      Number(ethers.utils.formatEther(item.totalPrice)) +
      (10 / 100) * Number(ethers.utils.formatEther(item.totalPrice));
    console.log(`listing price is ${listingPrice}`);
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    console.log(marketplace.address);
    // add nft to marketplace
    await (await marketplace.sellItem(item.itemId)).wait();
    loadPurchasedItems();
  };

  useEffect(() => {
    loadPurchasedItems();
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
            {purchases.length > 0 ? (
              <Container>
                <h2>Purchased Items</h2>
                <Row xs={1} md={2} lg={4}>
                  {purchases.map((item, idx) => (
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
                            "margin-left": "0px",
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
                            Purchased for{" "}
                            {ethers.utils.formatEther(item.totalPrice)} ETH
                          </CardText>
                          <Button
                            onClick={() => sellNFT(item)}
                            className="btn-round"
                            color="primary"
                            variant="primary"
                            size="lg"
                          >
                            Sell for{" "}
                            {parseFloat(
                              Number(
                                ethers.utils.formatEther(item.totalPrice)
                              ) +
                                (10 / 100) *
                                  Number(
                                    ethers.utils.formatEther(item.totalPrice)
                                  )
                            ).toFixed(2)}{" "}
                            ETH
                          </Button>
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
              </Container>
            ) : (
              <Container>
                <h2 className="App-loader">
                  You have not purchased any Digital Assets yet
                </h2>
                <h4>
                  You can browse and purchase NFT's <a href="/trade">here</a>
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
