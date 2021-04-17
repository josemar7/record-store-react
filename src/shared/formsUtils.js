import React from 'react';

import Input from "../UI/Input/Input";
import Button from '../UI/Button/Button';
import Image from '../UI/Image/Image';
import { checkValidity } from "./utility";
import { FaPlusCircle } from "react-icons/fa";

export const artistForm = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Artist name...',
            label: 'Name'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        onClickModal: null
    },
    nationality: {
        elementType: 'select',
        elementConfig: {
            options: [],
            label: 'Nationality'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false,
        onClickModal: null
    },
    style: {
        elementType: 'select',
        elementConfig: {
            options: [],
            label: 'Style'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false,
        onClickModal: null
    }
};

export const recordForm = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Record name...',
            label: 'Name'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        onClickModal: null
    },
    format: {
        elementType: 'select',
        elementConfig: {
            options: [],
            label: 'Format'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false,
        onClickModal: null
    },
    artist: {
        elementType: 'select',
        elementConfig: {
            options: [],
            label: 'Artist'
        },
        value: '',
        validation: {
            required: true
        },
        valid: true,
        touched: false,
        onClickModal: null
    },
    units: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Units number...',
            label: 'Units'
        },
        value: '',
        validation: {
            required: true,
            isNumeric: true,
            min: 0,
            max: 20
        },
        valid: false,
        touched: false,
        onClickModal: null
    },
    image: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Image...',
            label: 'Image'
        },
        value: '',
        valid: true,
        touched: false,
        onClickModal: null
    }
};

export const inputChangedHandler = (event, inputIdentifier, component, form) => {
    const updatedForm = {
        ...component.state[form]
    };
    const updatedFormElement = {
        ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for(let ip in updatedForm) {
        formIsValid = updatedForm[ip].valid && formIsValid;
    }
    component.setState({[form]: updatedForm, formIsValid: formIsValid});
};

export const getForm = (formElementsArray, handler, component, form, imageUrl) => {    
    let i = 0;
    return (
        <form onSubmit={handler}>
        {formElementsArray.map(formElement => (
            <div key={++i}>
                <Input key={formElement.id}
                        label={formElement.config.elementConfig.label}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        changed={(event) => inputChangedHandler(event, formElement.id, component, form)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>                
                {drawAddButton(formElement.config.onClickModal)}
            </div>
        ))}    
        {imageUrl != null ? <Image src={imageUrl}/> : null}
        <Button 
            disabled={!component.state.formIsValid}>Save</Button>
        </form>            
    );
};

export const drawAddButton = (onClickModal) => {
    let addButton = null;
    if (onClickModal !== null) {
        addButton = <a href='#' style={{padding: '15px'}} onClick={onClickModal}><FaPlusCircle/></a>;
    }
    return addButton;
};
