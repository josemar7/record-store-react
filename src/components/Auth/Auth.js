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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.props.form.user.value, this.props.form.password.value, false);
    };

    render() {
        const formElementsArray = [];
        for (let key in this.props.form) {
            const formElement = this.props.form[key];
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
                formTemplate={authFormu}
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
        isAuthenticated: state.auth.access_token !== null,
        form: state.form.form
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (user, password, isSignup) => dispatch(actions.auth(user, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));