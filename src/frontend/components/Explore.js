import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './App.css';
import './Card.css';

const Explore = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [address, setAddress] = useState('')
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    let address = await marketplace.signer.getAddress()
        setAddress(address)
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          tipAmount: item.tipAmount
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])

  const tip = async (item) => {
    // tip post owner
    await (await marketplace.tipOwner(item.itemId, { value: ethers.utils.parseEther("0.1") })).wait()
    loadMarketplaceItems()
}

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 className='App-loader'>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card className='Card'>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title className='Card-text'>{item.name}</Card.Title>
                    <Card.Text className='Card-text'>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                      {address === item.seller ? 
                      null : <div>
                          <Button onClick={() => tip(item)} variant="link" size="md">
                            Tip for 0.1 ETH
                          </Button>
                        </div>}
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2 className='App-loader'>Oops .... the Marketplace is empty</h2>
            <h4>You can Create and Sell your own NFT's <Link to={'/create'}>here</Link></h4>
          </main>
        )}
    </div>
  );
}
export default Explore