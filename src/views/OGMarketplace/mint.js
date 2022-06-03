import React from "react";
import { useState } from "react";
import classnames from "classnames";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.js";

//web3 imports
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function MintPage({ marketplace, nft }) {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fileNameFocus, setFileNameFocus] = React.useState(false);
  const [fileFocus, setFileFocus] = React.useState(false);
  const [descFocus, setDescFocus] = React.useState(false);
  const [priceFocus, setPriceFocus] = React.useState(false);

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
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  function refreshPage() {
    window.location.reload();
  }

  // web3 stuff --------------------------------------------------------------------------------------------------------------

  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
        document.getElementById(
          "preview"
        ).src = `https://ipfs.infura.io/ipfs/${result.path}`;
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      console.log(`priceis ${price}`);
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice))
      .wait()
      .then(refreshPage);
  };

  // -----------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="wrapper">
        <div className="page-header" style={{ "max-height": "100%" }}>
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="6" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                      />
                      <CardTitle tag="h4">Mint</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fileFocus,
                          })}
                        >
                          <Input
                            placeholder="No file chosen"
                            type="file"
                            style={{ height: "auto" }}
                            onFocus={(e) => setFileFocus(true)}
                            onBlur={(e) => setFileFocus(false)}
                            name="file"
                            required
                            onChange={uploadToIPFS}
                          />
                        </InputGroup>

                        <InputGroup
                          className={classnames({
                            "input-group-focus": fileNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-solid fa-file-signature" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Name"
                            type="text"
                            onFocus={(e) => setFileNameFocus(true)}
                            onBlur={(e) => setFileNameFocus(false)}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </InputGroup>

                        <InputGroup
                          className={classnames({
                            "input-group-focus": descFocus,
                          })}
                        >
                          <textarea
                            placeholder="Description"
                            style={{
                              height: "100px",
                              width: "100%",
                              "border-radius": "0.4285rem",
                              "border-color": "#2b3553",
                              background: "#1f1f1f",
                              color: "white",
                              padding: "10px",
                            }}
                            onFocus={(e) => setDescFocus(true)}
                            onBlur={(e) => setDescFocus(false)}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          />
                        </InputGroup>

                        <InputGroup
                          className={classnames({
                            "input-group-focus": priceFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa-brands fa-ethereum" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Price in ETH"
                            type="number"
                            onFocus={(e) => setPriceFocus(true)}
                            onBlur={(e) => setPriceFocus(false)}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </InputGroup>

                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" disabled checked />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a href="#tos" onClick={(e) => e.preventDefault()}>
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={createNFT}
                      >
                        Mint It
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>

                <Col className="offset-lg-0 offset-md-3" lg="6" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <h1 style={{ padding: "20px" }}>Preview</h1>
                    <CardBody>
                      <img
                        alt="..."
                        id="preview"
                        className="img-raised"
                        src={require("assets/images/starrynight.jpg")}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* <div className="register-bg" style={{overflow:"hidden"}}/> */}
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
