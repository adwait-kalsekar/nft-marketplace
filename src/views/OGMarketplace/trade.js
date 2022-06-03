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

export default function TradePage({ marketplace, nft }) {
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
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [nosearch, setNosearch] = useState(false);
  const loadMarketplaceItems = async () => {
    console.log(`nft: ${nft}`);
    console.log(`marketplace: ${marketplace}`);
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = [];
    let searchedItems = [];
    let address = await marketplace.signer.getAddress();
    setAddress(address);
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          tipAmount: item.tipAmount,
        });
      }
    }
    setLoading(false);
    if (search) {
      searchedItems = items.filter((item) => {
        return (
          item.name.toString().toLowerCase().trim() ===
          search.toString().toLowerCase().trim()
        );
      });
      if (!searchedItems) {
        setNosearch(true);
      } else {
        setNosearch(false);
      }
      setItems(searchedItems);
    } else {
      setItems(items);
    }
  };

  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  };

  const searchMarketItem = async (search) => {
    console.log(`search: ${search}`);
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tip = async (item) => {
    // tip post owner
    await (
      await marketplace.tipOwner(item.itemId, {
        value: ethers.utils.parseEther("0.1"),
      })
    ).wait();
    loadMarketplaceItems();
  };

  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2 style={{ padding: "100px" }}>Loading...</h2>
      </main>
    );

  // ------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="wrapper">
        <div className="page-header" style={{ "max-height": "100%" }}>
          <div className="page-header-image" />
          <div className="content">
            {items.length > 0 ? (
              <Container>
                <input
                  type="text"
                  style={{
                    width: "40%",
                    "border-radius": "0.4285rem",
                    "border-color": "#2b3553",
                    "border-width": "2px",
                    "border-style": "solid",
                    background: "#1f1f1f",
                    color: "white",
                    padding: "10px",
                    margin: "20px",
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for an nft."
                  value={search}
                />
                <button
                  className="btn-icon btn-round btn btn-primary"
                  onClick={() => searchMarketItem(search)}
                >
                  <i class="fa-brands fa-searchengin"></i>
                </button>
                <br />
                <br />
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
                            "margin-left": "0px",
                          }}
                        />
                        <CardBody>
                          <CardTitle>{item.name}</CardTitle>
                          <CardText>{item.description}</CardText>
                        </CardBody>
                        <CardFooter
                          className="text-center"
                          style={{ "margin-top": "0px" }}
                        >
                          {address === item.seller ? (
                            <Button
                              className="btn-success btn-link"
                              color="primary"
                              size="lg"
                            >
                              OWNED
                            </Button>
                          ) : (
                            <Button
                              onClick={() => buyMarketItem(item)}
                              className="btn-round"
                              color="primary"
                              variant="primary"
                              size="lg"
                            >
                              Buy for{" "}
                              {ethers.utils.formatEther(item.totalPrice)} ETH
                            </Button>
                          )}
                          {address === item.seller ? (
                            <Button
                              onClick={() => tip(item)}
                              className="btn-simple btn-round"
                              color="primary"
                              size="md"
                              href="/items"
                            >
                              Go to Items
                            </Button>
                          ) : (
                            <Button
                              onClick={() => tip(item)}
                              className="btn-round"
                              variant="link"
                              color="primary"
                              size="md"
                            >
                              Tip for 0.1 ETH
                            </Button>
                          )}
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
            ) : search && !nosearch ? (
              <Container>
                <h2 className="App-loader">Oops .... No digital asset found</h2>
                <h4>
                  <a href="/trade">Go Back</a>
                </h4>
              </Container>
            ) : (
              <Container>
                <h2 className="App-loader">
                  Oops .... the Marketplace is empty
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
