import React, { Component } from 'react';
// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
// Reactstrap
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

// Component Class
class AppNavbar extends Component {
    // Define states
    state = {
        isOpen: false
    }

    // Component functions
    toggle = () => {
        this.setState({
            // set it to NOT what it is. If it is open, close. If it is closed, open.
            isOpen: !this.state.isOpen
        });
    }

    // render component
    render() {
        return (
            <div>
            <Navbar color="success" dark expand="sm" className="mb-5">
                <Container>
                    
                    {/* NavBar logo */}
                    <NavbarBrand>
                        <FontAwesomeIcon icon={faLeaf}></FontAwesomeIcon>
                    </NavbarBrand>
                    <NavbarBrand>
                        Barraca's Groceries
                    </NavbarBrand>

                    {/* NavBar Toggler */}
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/dieguiviti/mern-list" target="_blank">
                                    Repo
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://dieguiviti.online" target="_blank">
                                    Maker
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>

                </Container>
            </Navbar>
        </div>
        );
    }
}

export default AppNavbar;