import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

import './About.css';

const About = () => {
  return (
    <div>
      <div className='About-text'>
      <h2>BTech CSE Final Year Capstone Project</h2>
    </div>
      <div className='Info'>
        <div className='Info-text'>
        <p> 
          NFTs are currently taking the digital art and collectibles world by storm. Digital artists are seeing their lives change thanks to huge sales to a new crypto-audience. And celebrities are joining in as they spot a new opportunity to connect with fans. But digital art is only one way to use NFTs. Really they can be used to represent ownership of any unique asset, like a deed for an item in the digital or physical realm.
          <br></br>
          <br></br>
          This is a completely decentralized web 3 Application known as Decentralized Application or DApp created and deployed on the ethereum blockchain.
          This Application is a NFT Marketplace that allows users to Mint their own NFT from any artwork they own and sell it on the Marketplace as well as buy NFTs listed by other users.
          The NFT data gets stored on to the Inter Planetary File System or IPFS which is a distributed peer-to-peer network of nodes that allows storing of data.
          <br></br>
          <br></br>
          This application was made by the students of MIT WPU, Pune as a part of the BTech CSE Final Year Capstone Project.
          <br></br>
          <br></br>
          Our Team:
          <br></br>
          <br></br>
          <table>
            <tr>
              <td>Adwait Kalsekar</td>
              <td>1032180431</td>
            </tr>
            <tr>
              <td>Ranvijay Singh</td>
              <td>1032180568</td>
            </tr>
            <tr>
              <td>Kshitij Kapoor</td>
              <td>1032180743</td>
            </tr>
            <tr>
              <td>Saurav Suresh</td>
              <td>1032181276</td>
            </tr>
          </table>
        </p>
      </div>
      </div>
    </div>
  );
}
export default About