import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function MyNavbar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Refactored Spoon</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/days">Days</Nav.Link>
                    <Nav.Link href="/foodsearch">Food Search</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
