import { SetStateAction, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Products from "./products";
import { useNavigate } from 'react-router-dom';


function UniNavbar() {
    const navigate = useNavigate();
    const [currentComponent, setCurrentComponent] = useState("Products");
    const [componentProps, setComponentProps] = useState<any>({}); // Use `any` 


    const renderComponent = () => {
        switch (currentComponent) {
            default:
                return <Products {...componentProps} />;
        }
    };

    const handleNavClick = (path: string, component: SetStateAction<string>, props = {}) => {
        navigate(path);
        setCurrentComponent(component);
        setComponentProps(props);
    };

    return (
        <>


            <Navbar fixed="top" expand="lg" className="bg-body-tertiary" data-bs-theme="light" bg="primary">
                <Container>
                    <Navbar.Brand> <img alt="" onClick={() => handleNavClick("/", "Home", {})} src="./assets/images/logo.webp" width="30" height="30" className="d-inline-block align-top" />{'  '}Mayuukha</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" data-bs-theme="light">
                            <Nav.Link href="#home">NEW ARRIVALS</Nav.Link>
                            <NavDropdown title="THEME BASED" id="theme">
                                <NavDropdown.Item itemID="theme-krishna-leela" onClick={() => handleNavClick("/products", "Products", { containername: "theme", foldername: "theme-krishna-leela" })}>KRISHNA LEELA</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item itemID="theme-ganapati-natyam" onClick={() => handleNavClick("/products", "Products", { containername: "theme", foldername: "theme-ganapati-natyam" })}>GANAPATI NATYAM</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="KALAMKARI DUPATTA" id="kalamkari-dupatta">
                                <NavDropdown.Item itemID="dupatta-black-and-white-printed" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-dupatta", foldername: "dupatta-black-and-white-printed" })}>BLACK AND WHITE PRINTED</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item itemID="dupatta-hand-painted-on-bangalore-silk" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-dupatta", foldername: "dupatta-hand-painted-on-bangalore-silk" })}>HAND PAINTED ON BANGALORE SILK</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item itemID="dupatta-hand-painted-on-tusser-silk" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-dupatta", foldername: "dupatta-hand-painted-on-tusser-silk" })}>HAND PAINTED ON TUSSER SILK</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="KALAMKARI SAREE" id="kalamkari-saree">
                                <NavDropdown.Item itemID="saree-black-and-white-hand-drawn" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-saree", foldername: "saree-black-and-white-hand-drawn" })}>BLACK AND WHITE HAND DRAWN</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item itemID="saree-hand-painted-on-bangalore-silk" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-saree", foldername: "saree-hand-painted-on-bangalore-silk" })}>HAND PAINTED ON BANGALORE SILK</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item itemID="saree-hand-painted-on-tusser-silk" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-saree", foldername: "saree-hand-painted-on-tusser-silk" })}>HAND PAINTED ON TUSSER SILK</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item itemID="saree-hand-painted-on-semi-kanjeevaram-silk" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-saree", foldername: "saree-hand-painted-on-semi-kanjeevaram-silk" })}>HAND PAINTED ON SEMI KANJEEVARAM SILK</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item itemID="saree-hand-painted-on-pure-kanjeevaram-pattu" onClick={() => handleNavClick("/products", "Products", { containername: "kalamkari-saree", foldername: "saree-hand-painted-on-pure-kanjeevaram-pattu" })}>HAND PAINTED ON PURE KANJEEVARAM PATTU</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div>{renderComponent()}</div>
        </>

    );
}

export default UniNavbar;