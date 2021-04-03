import React, { useState } from "react";
import {connect} from 'react-redux';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import { updateObject } from "../../shared/utility";
import * as actions from '../../store/actions/index';

const Style = props => {

    const [styleForm, setStyleForm] = useState({
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
    });

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(styleForm, {
            [controlName]: updateObject(styleForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, styleForm[controlName].validation),
                touched: true
            })
        });
        setStyleForm(updatedControls);
    };


    const checkValidity = (value, rules) => {
        let isValid = true;
        if (rules !== undefined && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onSaveStyle(props.access_token, {name: styleForm.name.value});
        props.origin.setState({show: false})
    };

    const formElementsArray = [];
    for (let key in styleForm) {
        formElementsArray.push({
            id: key,
            config: styleForm[key]
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
                changed={(event) => inputChangedHandler(event, formElement.id)}/>
        </div>
    ));
    if (props.loading) {
        form = <Spinner/>;
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        access_token: state.auth.access_token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveStyle: (token, style) => dispatch(actions.saveStyle(token, style))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Style);