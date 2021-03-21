import React, {Component} from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        authForm: {
            user: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'User'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules !== undefined && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules !== undefined && rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules !== undefined && rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules !== undefined && rules.isEmail) {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid;
        }
        if (rules !== undefined && rules.isNumeric) {
            const pattern = /^[0-9]*$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.authForm,
            [controlName]: {
                ...this.state.authForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authForm[controlName].validation),
                touched: true
            }
        };
        this.setState({authForm: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.user.value, this.state.authForm.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <div className={classes.DivForm} key={formElement.id}>
                <Input
                    label={formElement.config.elementConfig.placeholder}
                    id={formElement.id}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            </div>
        ));
        if (this.props.loading) {
            form = <Spinner/>;
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/"/>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <br/>
                <Button btnType="Danger"
                        clicked={this.switchAuthModeHandler}>Switch
                    to {this.state.isSignup ? 'Sign in' : 'Sign up'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);