import React from 'react';
import {connect} from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = props => {
    return (
        <Aux className={classes.Content}>
            <Toolbar isAuth={props.isAuthenticated} isAdmin={props.isAdmin} user={props.user}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.access_token !== null,
        isAdmin: state.auth.roles.includes('ROLE_ADMIN'),
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(layout);