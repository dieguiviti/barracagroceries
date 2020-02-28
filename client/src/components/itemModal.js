import React, { Component } from 'react';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

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
    Jumbotron
} from 'reactstrap';
// redux connect and addItem action
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
// prop types
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modalIsOpen: false,
        name: ''
    };

    // prop types
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        };

        // Add Item via add item action
        this.props.addItem(newItem);

        // Close Modal
        this.toggle();
    };

    render(){
        return (
            <div>
                { 
                    this.props.isAuthenticated ? 
                        <Button
                            color="primary"
                            style={{marginTop: '3rem', marginLeft: '0.9rem'}}
                            onClick={this.toggle}
                        >
                            Add to cart
                        </Button> 
                    : 
                        <div>
                            <Jumbotron className="bg-success text-white text-center">
                                <h1 className="display-3">Welcome!</h1>
                                <p className="lead">This is the barracaShopping app.</p>
                                <hr className="my-2" />
                                <p>To use the app, please register or log in  with your username.</p>
                                <Button className="mb-3 mt-3" color="warning"><LoginModal /></Button>
                                <br></br>
                                <Button color="warning"><RegisterModal/></Button>
                        
                            </Jumbotron>
                        </div>
                }

                <Modal
                    isOpen={this.state.modalIsOpen}
                    toggle={this.toggle}
                >

                    <ModalHeader toggle={this.toggle}>What's missing?</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Grocery</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Ex: eggs, spinach or broccoli"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="success"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Add to cart
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

const MAP_STATE_TO_PROPS = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    MAP_STATE_TO_PROPS, 
    {addItem}
    )(ItemModal);

