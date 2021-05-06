import React from 'react';
import Select from 'react-select';

import classes from './Input.css';

const Input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case('input'):
            inputElement = <input {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            autoFocus={props.autofocus}
            className={inputClasses.join(' ')}/>;
            break;
        case('select'):
            inputElement = (
            <select value={props.value}
            className={inputClasses.join(' ')}
            onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value}
                    value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            );
        break;
        case('selectReact'):
            inputElement = (
                <Select value={props.value}
                options={props.elementConfig.options}
                onChange={props.changed}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                // onInputChange={props.selectReactInputChangeHandler} 
                className={inputClasses.join(' ')}/>
            );
        break;
        default:
            inputElement = <input {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            className={inputClasses.join(' ')}/>;
    }
    return (
        <div style={{display: 'inline'}}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;