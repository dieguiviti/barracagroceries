import React, { Component } from 'react';
// reactstrap
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
// Transition Group
import { 
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// Connect: for mapping state to properties
import { connect } from 'react-redux';
//  action parameters
import { getItems, deleteItem } from '../actions/itemActions';
// Property validation
import PropTypes from 'prop-types';


// COMPONENT CLASS
class List extends Component {
    
    //Life Cycle
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = _id => {
        this.props.deleteItem(_id);
    }

    // RENDER COMPONENT
    render() {
        const { ITEMS } = this.props.item;

        return(
            <Container>
                <div>
                    <h3 id="list-header">
                        <FontAwesomeIcon className="mr-4" icon={faShoppingCart}></FontAwesomeIcon>
                    </h3>
                </div>
                {/* 
                    LIST of todo's
                */}
                <ListGroup>
                    <TransitionGroup className="List">
                        {/* 
                        -Map through all objects inside items
                        -CSS transition refers the mapped index to a unique key which we link to the current object id
                        -CSS transition class 'fade' for fading transitions
                        -Display dynamic name variable from items' current mapped object within ListGroupItem
                        */}
                        {ITEMS.map( ({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade"> 
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="warning"
                                        size="sm"
                                        // on click, grab state and set items object OF current state equal to items.filter
                                        // returning all items whose id is not equal to the one currently selected
                                        onClick={ this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        );
    }
}


List.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(
    mapStateToProps, 
    { getItems, deleteItem }
    )(List);

