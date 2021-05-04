import React, {Component} from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import Spinner from '../../UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {authFormu} from '../../shared/formsUtils';
import Form from "../../UI/Form/Form";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
class Auth extends Component {

    state = {
        authFormu: authFormu,
        formIsValid: false
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authFormu.user.value, this.state.authFormu.password.value, false);
        // this.props.history.push('/home');
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.authFormu) {
            const formElement = this.state.authFormu[key];
            formElementsArray.push({
                id: key,
                config: formElement
            });
        }
        let form = null;
        if (this.props.loading) {
            form = <Spinner/>;
        }
        else {
            form = <Form elements={formElementsArray}
                component={this} 
                form={'authFormu'}
                handler={this.submitHandler} 
                imageUrl={null} 
                loading={this.props.loading} />;
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/home"/>
        } 
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <br/>
            </div>
        );    
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.access_token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (user, password, isSignup) => dispatch(actions.auth(user, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));