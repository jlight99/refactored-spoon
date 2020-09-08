import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function MyNavbar() {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        history.push('/signin');
    }

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
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </Navbar>
    );
}
