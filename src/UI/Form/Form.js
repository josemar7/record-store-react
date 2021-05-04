import React, {Component} from 'react';
import { FaPlusCircle } from "react-icons/fa";

import { checkValidity } from '../../shared/utility';
import Input from '../Input/Input';
import Image from '../Image/Image';
import Button from '../Button/Button';

class Form extends Component {

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.props.component.state[this.props.form]
        };
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };
        if (updatedFormElement.elementType === 'selectReact') {
            updatedFormElement.value = event;
        }
        else {
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }        
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;    
        for(let ip in updatedForm) {
            formIsValid = updatedForm[ip].valid && formIsValid;
        }
        this.props.component.setState({[this.props.form]: updatedForm, formIsValid: formIsValid});
    };

    getForm = (formElementsArray, handler, imageUrl, button) => {    
        let strButton = 'Save';
        if (button !== undefined) {
            strButton = button;
        }
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
                            changed={(event) => this.inputChangedHandler(event, formElement.id,)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}/>                
                    {this.drawAddButton(formElement.config.onClickModal)}
                </div>
            ))}    
            {imageUrl != null ? <Image src={imageUrl}/> : null}
            <Button 
                disabled={!this.props.component.state.formIsValid}>{strButton}</Button>
            </form>            
        );
    };
    
    drawAddButton = (onClickModal) => {
        let addButton = null;
        if (onClickModal !== undefined && onClickModal !== null) {
            addButton = <a href='#' style={{padding: '15px'}} onClick={onClickModal}><FaPlusCircle/></a>;
        }
        return addButton;
    };    
    
    render() {
        return this.getForm(this.props.elements, this.props.handler, this.props.imageUrl, this.props.button);
    }
}

export default Form;