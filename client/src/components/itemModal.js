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
    Input
} from 'reactstrap';
// redux connect and addItem action
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modalIsOpen: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        // Add Item via add item action
        this.props.addItem(newItem);

        // Close Modal
        this.toggle();
    }

    render(){
        return (
            <div>
                <Button
                    color="primary"
                    style={{marginTop: '3rem', marginLeft: '0.9rem'}}
                    onClick={this.toggle}
                >
                    Add to cart
                </Button>

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

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, {addItem})(ItemModal);

