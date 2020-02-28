// Components
import React, { Component, Fragment } from 'react';
import RegisterModal from '../components/auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from '../components/auth/Logout';
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
// Connect to redux
import { connect } from 'react-redux';
// PropTypess
import PropTypes from 'prop-types';

// Component Class
class AppNavbar extends Component {
    // Define states
    state = {
        isOpen: false
    };

    // Proptypes
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    // Component functions
    toggle = () => {
        this.setState({
            // set it to NOT what it is. If it is open, close. If it is closed, open.
            isOpen: !this.state.isOpen
        });
    };

    // render component
    render() {
        // Pull state of props from this.props
        const { isAuthenticated, user } = this.props.auth;

        const AUTH_LINKS = (
            <Fragment>
                <NavItem className="mr-3">
                    <span className="navbar-text text-center text-white">
                        <strong>{ user ? `${ user.username }` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const GUEST_LINKS = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        );


        return (
            <div>
            <Navbar color="success" dark expand="md" className="mb-5">
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
                            {/* is the user logged in or out? */}
                            { isAuthenticated ? AUTH_LINKS : GUEST_LINKS }
                            {/* REPO AND MAKER LINKS */}
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

// Map state to props
const MAP_STATE_TO_PROPS = state => ({
    auth: state.auth
});

// Export component
export default connect(MAP_STATE_TO_PROPS, null)(AppNavbar);