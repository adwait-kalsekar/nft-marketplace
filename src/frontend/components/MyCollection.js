import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './App.css';
import './Card.css';
//import { Button } from 'bootstrap';

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const [time, setTime] = useState(false)
  const [address, setAddress] = useState('')
  // const loadPurchasedItems = async () => {
  //   // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
  //   const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
  //   const results = await marketplace.queryFilter(filter)
  //   //Fetch metadata of each nft and add that to listedItem object.
  //   const purchases = await Promise.all(results.map(async i => {
  //     // fetch arguments from each result
  //     console.log(`i before args = ${i}`)
  //     i = i.args
  //     console.log(`i after args = ${i}`)
  //     const item = await marketplace.items(i.tokenId)
  //     console.log(`item.sellOwned ${item.sellOwned}`)
      
  //     // get uri url from nft contract
  //     const uri = await nft.tokenURI(i.tokenId)
  //     // use uri to fetch the nft metadata stored on ipfs 
  //     const response = await fetch(uri)
  //     const metadata = await response.json()
  //     // get total price of item (item price + fee)
  //     const totalPrice = await marketplace.getTotalPrice(i.itemId)
  //     // define listed item object
      
  //     let purchasedItem = {
  //       totalPrice,
  //       price: i.price,
  //       itemId: i.itemId,
  //       name: metadata.name,
  //       description: metadata.description,
  //       image: metadata.image
  //     }
  //     console.log(purchasedItem)
  //     return purchasedItem
  //   }))
  //   console.log(purchases)
  //   setLoading(false)
  //   setPurchases(purchases)
  // }

  const loadPurchasedItems = async () => {
    const itemCount = await marketplace.itemCount()
    let purchases = []
    setAddress(account)
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if ((item.owner).toString().toLowerCase() === account.toString().toLowerCase()) {
        console.log("item.owner", (item.owner).toString().toLowerCase())
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        purchases.push({
          totalPrice,
          price: item.price,
          itemId: item.itemId,
          seller: item.seller,
          owner: item.owner,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        })
      }
    }
    console.log(purchases)
    console.log(address)
    setLoading(false)
    setPurchases(purchases)
  }
  
  const sellNFT = async (item) => {
    console.log(`item.price: ${item.price}`)
    //item.price += (10/100) * item.price
    //console.log(`item.price: ${item.price}`)
    const listingPrice = Number(ethers.utils.formatEther(item.totalPrice)) + (10/100) * Number((ethers.utils.formatEther(item.totalPrice)))
    console.log(`listing price is ${(listingPrice)}`)
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    console.log(marketplace.address)
    // add nft to marketplace
    await(await marketplace.sellItem(item.itemId)).wait()
    loadPurchasedItems();
  }
  
  useEffect(() => {
    loadPurchasedItems()
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
      {purchases.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card className='Card'>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer className='Card-text'>
                    <div>Purchased for&nbsp;
                    {ethers.utils.formatEther(item.totalPrice)} ETH
                    <br></br>
                    <br></br>
                    <Button onClick={() => sellNFT(item)} variant="primary" size="lg">
                      Sell for {Number(ethers.utils.formatEther(item.totalPrice)) + (10/100) * Number((ethers.utils.formatEther(item.totalPrice)))}
                    </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2 className='App-loader'>You have not purchased any Digital Assets yet</h2>
            <h4>Explore the Marketplace to find NFT's <Link to={'/'}>here</Link></h4>
          </main>
        )}
    </div>
  );
}