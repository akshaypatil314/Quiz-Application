import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CommonNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" style={{ fontSize: 20, fontWeight: 600 }}>
            <Container>
                <Navbar.Brand>Quiz App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CommonNavbar;