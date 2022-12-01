import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
    return(
        <>
         {[false].map((expand) => (
        <Navbar bg="dark" expand={expand} className="mb-3" variant="dark" sticky="top">
          <Container fluid>
          <Navbar.Brand href="#">Name Of Company</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Please Sign In
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                <LinkContainer to="/About"><Nav.Link>About</Nav.Link></LinkContainer>
                <LinkContainer to="/ContactUs"><Nav.Link>Contact Us</Nav.Link></LinkContainer>
                </Nav>
                <Form>
                  <Form.Control
                    type="text"
                    placeholder="Username or Emial-id"
                    className="m-1"
                    aria-label="UserName"
                  />
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="m-1"
                    aria-label="Password"
                  />
                  <Button variant="dark" size="sm" className="m-1">Log-In</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
         ))}
</>
    );
}

export default Header;