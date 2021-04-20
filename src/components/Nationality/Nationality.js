import React, { Component } from "react";
import {connect} from 'react-redux';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import { checkValidity, updateObject } from "../../shared/utility";
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Nationality extends Component {

    state = {
        nationalityForm: {
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
            const updatedControls = updateObject(state.nationalityForm, {
                name: updateObject(state.nationalityForm['name'], {
                    value: ''
                })
            });
            props.origin.setState({showNationality: false});
            return {nationalityForm: updatedControls};
        }    
        return state;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.nationalityForm, {
            [controlName]: updateObject(this.state.nationalityForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.nationalityForm[controlName].validation),
                touched: true
            })
        });
        this.setState({nationalityForm: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSaveNationality(this.props.access_token, {name: this.state.nationalityForm.name.value});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.nationalityForm) {
            formElementsArray.push({
                id: key,
                config: this.state.nationalityForm[key]
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
        closeDialog: state.nationality.closeDialog,
        loading: state.nationality.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveNationality: (token, nationality) => dispatch(actions.saveNationality(token, nationality))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Nationality, axios));