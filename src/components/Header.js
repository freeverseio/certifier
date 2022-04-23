import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Config from '../Config';

function Header() {
    return (<Navbar className="color-nav" variant="dark">
        <Container>
            <Navbar.Brand href="#home"> <img
                alt=""
                src="/img/freeverse_logo.svg"
                height="30"
                className="d-inline-block align-top"
            /> </Navbar.Brand>
            <Nav>
                <Nav.Link href={Config.contract}>Blockchain Contract</Nav.Link>
               
            </Nav>
        </Container>
    </Navbar>);
}
export default Header;