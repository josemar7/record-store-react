import React, { Component } from "react";
import {connect} from 'react-redux';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import { checkValidity, updateObject } from "../../shared/utility";
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Style extends Component {

    state = {
        styleForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }    
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (props.closeDialog) {
            const updatedControls = updateObject(state.styleForm, {
                name: updateObject(state.styleForm['name'], {
                    value: ''
                })
            });
            props.origin.setState({showStyle: false});
            return {styleForm: updatedControls};
        }    
        return state;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.styleForm, {
            [controlName]: updateObject(this.state.styleForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.styleForm[controlName].validation),
                touched: true
            })
        });
        this.setState({styleForm: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSaveStyle(this.props.access_token, {name: this.state.styleForm.name.value});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.styleForm) {
            formElementsArray.push({
                id: key,
                config: this.state.styleForm[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <div key={formElement.id}>
                <Input
                    label={formElement.config.elementConfig.placeholder}
                    id={formElement.id}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value || ''}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            </div>
        ));
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Save</Button>
                </form>
            </div>
        );    
    }

}

const mapStateToProps = state => {
    return {
        access_token: state.auth.access_token,
        closeDialog: state.style.closeDialog,
        loading: state.style.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveStyle: (token, style) => dispatch(actions.saveStyle(token, style))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Style, axios));