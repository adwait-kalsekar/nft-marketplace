import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './App.css';
import './Card.css';

function renderSoldItems(items) {
  return (
    <>
      <h2 className='App-loader'>Sold</h2>
      <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card className='Card'>
              <Card.Img variant="top" src={item.image} />
              <Card.Footer className='Card-text'>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved {ethers.utils.formatEther(item.price)} ETH
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default function MyListedItems({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])
  const [time, setTime] = useState(false)
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }
  useEffect(() => {
    loadListedItems()
  }, [])
  
  setTimeout(() => setTime(true), 10000)
  if (loading && !time) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 className='App-loader'>Loading...</h2>
    </main>
  )
  else if(loading && time) return (
    <main style={{ padding: "1rem 0" }}>
      <h2 className='App-loader'>Loading...</h2>
      <h5>(Check if metamask network is configured correctly)</h5>
    </main>
  )
  return (
    <div className="flex justify-center">
      {listedItems.length > 0 ?
        <div className="px-5 py-3 container">
            <h2 className='App-loader'>Listed</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card className='Card'>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer className='Card-text'>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
            {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2 className='App-loader'>You have not minted any Digital Assets yet</h2>
            <h4>You can Create and Sell your own NFT's <Link to={'/create'}>here</Link></h4>
          </main>
        )}
    </div>
  );
}