import React, { Component } from "react";
import {connect} from 'react-redux';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import { checkValidity, updateObject } from "../../shared/utility";
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Format extends Component {

    state = {
        formatForm: {
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
        if (props.error !== undefined && !props.error) {
            const updatedControls = updateObject(state.formatForm, {
                name: updateObject(state.formatForm['name'], {
                    value: ''
                })
            });
            props.origin.setState({showFormat: false});
            return {formatForm: updatedControls};
        }    
        return state;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.formatForm, {
            [controlName]: updateObject(this.state.formatForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.formatForm[controlName].validation),
                touched: true
            })
        });
        this.setState({formatForm: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSaveFormat(this.props.access_token, {name: this.state.formatForm.name.value});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.formatForm) {
            formElementsArray.push({
                id: key,
                config: this.state.formatForm[key]
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
        error: state.format.error,
        loading: state.format.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveFormat: (token, format) => dispatch(actions.saveFormat(token, format))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Format, axios));