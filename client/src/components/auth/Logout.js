import React, { Component, Fragment } from 'react';
// import logout functionallity
import { LOGOUT } from '../../actions/authActions';
// connect for react-redux
import { connect } from 'react-redux';
// Reacstrap
import { NavLink } from 'reactstrap';
// PropTypes
import PropTypes from 'prop-types';

// Component
class Logout extends Component {
    static propTypes = {
        LOGOUT: PropTypes.func.isRequired
    }

    render(){
        return(
            <Fragment>
                <NavLink onClick={this.props.LOGOUT}>
                    Logout
                </NavLink>
            </Fragment>
        )
    }
}

export default connect(null, { LOGOUT })(Logout);