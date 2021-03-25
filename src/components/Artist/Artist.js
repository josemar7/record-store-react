import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Label from '../../UI/Label/Label';
import classes from './Artist.css';
import * as actions from '../../store/actions/index';

class Artist extends Component {

    state = {
        artistForm: {
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
                touched: false
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
                touched: false
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
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    };

    componentDidMount() {        
        this.props.onGetStyles();
        this.props.onGetNationalities();
    }

    artistHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.artistForm) {
            formData[formElementIdentifier] = this.state.artistForm[formElementIdentifier].value;
        }
        console.log(formData);
        // axios.post('/orders.json', formData)
        // .then(response => {
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        // })
        // .catch(error => this.setState({loading: false}))

    };


    checkValidity(value, rules) {
        let isValid = true;
        if (rules !== undefined && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules !== undefined &&rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules !== undefined &&rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedArtistForm = {
            ...this.state.artistForm
        };
        const updatedFormElement = {
            ...updatedArtistForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedArtistForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let ip in updatedArtistForm) {
            formIsValid = updatedArtistForm[ip].valid && formIsValid;
        }
        this.setState({artistForm: updatedArtistForm, formIsValid: formIsValid});
    };

    render() {
        const stylesCpy = [...this.props.styles];
        const nationalitiesCpy = [...this.props.nationalities];
        const formElementsArray = [];
        for (let key in this.state.artistForm) {
            const formElement = this.state.artistForm[key];
            if (key === 'style') {
                const optionsStyle = stylesCpy.map(style => {
                    return {value: style.id, displayValue: style.name};
                });
                formElement.elementConfig.options = optionsStyle;
            }
            else if (key === 'nationality') {
                const optionsNationality = nationalitiesCpy.map(nationality => {
                    return {value: nationality.id, displayValue: nationality.name};
                });
                formElement.elementConfig.options = optionsNationality;
            }
            formElementsArray.push({
                id: key,
                config: formElement
            });
        }
        let form = (
            <form onSubmit={this.artistHandler}>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                            label={formElement.config.elementConfig.label}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} 
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}/>
                ))}             
                <Button 
                    disabled={!this.state.formIsValid}>Add Artist</Button>   
            </form>            
        );
        return (
                <div className={classes.Artist}>
                    <Label>Edit Artist</Label>
                    {form}                    
                </div>
        );            
    }
}

const mapStateToProps = state => {
    return {
        styles: state.commons.styles,
        nationalities: state.commons.nationalities,
        loading: state.commons.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetStyles: () => dispatch(actions.getStyles()),
        onGetNationalities: () => dispatch(actions.getNationalities())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Artist, axios));