import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import nft_logo from './nft_logo.png'

import './Navbar.css'

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" className="toggle" variant="dark">
            <Container>
                <Navbar.Brand href="http://127.0.0.1:3000/">
                    <img src={nft_logo} width="40" height="40" className="" alt="" />
                    &nbsp; ARKS NFT Marketplace
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Explore</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-collection">My Collection</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {account ? (
                            <Nav.Link
                                as={Link}
                                to="/profile"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;