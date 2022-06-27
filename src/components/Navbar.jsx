import React from 'react'
import { Container, Navbar , Nav} from 'react-bootstrap';


const Appbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Movie Mania</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/wishlist/create">Create WishList</Nav.Link>
                <Nav.Link href={`/wishlist/${user.uid}`}>Wishlist</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("favorites");
                  }}
                  href="/">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar