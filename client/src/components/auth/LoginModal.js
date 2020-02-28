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
    NavLink,
    Alert
} from 'reactstrap';
// import connect in order to connect to redux
import { connect } from 'react-redux';
// Bring prop types to set up prop types
import PropTypes from 'prop-types';
// Bring necessary actions for reducer from actions
import { LOGIN } from '../../actions/authActions';
import { CLEAR } from '../../actions/errorActions';

// Component class
class LoginModal extends Component {
    // Default state
    state = {
        modalIsOpen: false,
        username: '',
        password: '',
        message: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        LOGIN: PropTypes.func.isRequired,
        CLEAR: PropTypes.func.isRequired
    };

    // Check prev props after attempt to update
    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        // check if errors are the same
        if(error !== prevProps.error){
            // Check for a REGISTER_FAIL
            if (error.id === 'LOGIN_FAIL'){
                this.setState({
                    message: error.message.message
                });
            } else {
                this.setState({ message: null })
            };
        };

        // check if registration worked and close modal
        if(this.state.modalIsOpen){
            if(isAuthenticated){
                this.toggle();
            };
        };
    };

    // toggle modal
    toggle = () => {
        // clear errors
        this.props.CLEAR();
        // Set state
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    };

    // Add form data to state
    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // on submit event
    onSubmit = event => {
        event.preventDefault();

        // get form data from state
        const { username, password } = this.state;

        // create logged user object
        const USER = {
            username,
            password
        };

        // call the LOGIN method
        this.props.LOGIN(USER);
    }

    // render component
    render(){
        return (
            <div>
                {/*  REGISTER MODAL LINK */}
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>

                <Modal isOpen={this.state.modalIsOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                    {/* IS THERE AN ALERT TO GIVE? CHECK STATE FOR ERROR MESSAGE */}
        { this.state.message ? <Alert color="danger">{ this.state.message }</Alert> : null }
                        {/* REGISTRATION FORM */}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                {/* USERNAME */}
                                <Label for="username">Username</Label>
                                <Input onChange={this.onChange} className="mb-3" type="text" name="username" id="username" placeholder="EX: GoDiegoGo"/>
                                {/* PASSWORD */}
                                <Label for="password">Password</Label>
                                <Input onChange={this.onChange} className="mb-3" type="password" name="password" id="password" placeholder="Make it a strong password"/>                            

                                {/* SUBMIT BUTTON */}
                                <Button color="success" style={{ marginTop: '2rem' }} block>
                                    Login
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
    { LOGIN, CLEAR }
)(LoginModal);