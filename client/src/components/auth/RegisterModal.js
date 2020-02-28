import React, { Component } from 'react';
// Reactstrap
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink
} from 'reactstrap';
// import connect in order to connect to redux
import { connect } from 'react-redux';
// Bring prop types to set up prop types
import PropTypes from 'prop-types';

// Component class
class RegisterModal extends Component {
    // Default state
    state = {
        modalIsOpen: false,
        name: '',
        username: '',
        email: '',
        password: '',
        message: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired
    }

    // toggle modal
    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    };

    // on change event
    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // on submit event
    onSubmit = event => {

        this.setState({

        });

        // Close modal after registration success
        this.toggle();
    }

    // render component
    render(){
        return (
            <div>
                {/*  REGISTER MODAL LINK */}
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal isOpen={this.state.modalIsOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {/* REGISTRATION FORM */}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                {/* NAME */}
                                <Label for="name">Full Name</Label>
                                <Input className="mb-3" type="text" name="name" id="name" placeholder="Ex: Diego Perez"/>
                                {/* USERNAME */}
                                <Label for="username">Username</Label>
                                <Input className="mb-3" type="text" name="username" id="username" placeholder="EX: GoDiegoGo"/>
                                {/* EMAIL */}
                                <Label for="email">Email</Label>
                                <Input className="mb-3" type="email" name="email" id="email" placeholder="somename@something.com"/>
                                {/* PASSWORD */}
                                <Label for="password">Password</Label>
                                <Input className="mb-3" type="password" name="password" id="password" placeholder="Make it a strong password"/>                            

                                {/* SUBMIT BUTTON */}
                                <Button color="success" style={{ marginTop: '2rem' }} block>
                                    All in!
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        )
    }


}

// Map state to properties
const MAP_STATE_TO_PROPS = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

// Export component with respective actions
export default connect(
    MAP_STATE_TO_PROPS,
    {}
)(RegisterModal);
