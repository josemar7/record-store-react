import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Label from '../../UI/Label/Label';
import Spinner from '../../UI/Spinner/Spinner';
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
        this.props.onGetStyles(this.props.access_token);
        this.props.onGetNationalities(this.props.access_token);
        if (this.props.match.params.id !== undefined) {
            this.props.onGetArtistById(this.props.access_token, this.props.match.params.id);
        }        
    }

    artistHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let name;
        let idNationality;
        let idStyle;
        for (let formElementIdentifier in this.state.artistForm) {
            // formData[formElementIdentifier] = this.state.artistForm[formElementIdentifier].value;
            if (formElementIdentifier === 'name') {
                name = this.state.artistForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'nationality') {
                idNationality = this.state.artistForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'style') {
                idStyle = this.state.artistForm[formElementIdentifier].value;
            }
        }
        const artist = {
            name: name,
            nationality: {
                id: idNationality
            },
            style: {
                id: idStyle
            }
        };
        this.props.onSaveArtist(artist, this.props.access_token, this.props.history);
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

    transformArtistForEdition = (stylesCpy, nationalitiesCpy, artist) => {
        if (stylesCpy.length > 0 && nationalitiesCpy.length > 0 && artist !== null) {
            const styleFound = stylesCpy.find(e => e.name === artist.style);
            const nationalityFound = nationalitiesCpy.find(n => n.name === artist.nationality);
            return {
                style: styleFound.id,
                nationality: nationalityFound.id,
                name: artist.name
            };
        }
        return null;
    };

    render() {        
        const stylesCpy = [...this.props.styles];
        const nationalitiesCpy = [...this.props.nationalities];
        const formElementsArray = [];
        const artistTransformed = this.transformArtistForEdition(stylesCpy, nationalitiesCpy, this.props.artist);
        for (let key in this.state.artistForm) {
            const formElement = this.state.artistForm[key];
            if (key === 'name' && artistTransformed !== null) {
                formElement.value = artistTransformed.name;
            }
            else if (key === 'style') {
                const optionsStyle = stylesCpy.map(style => {
                    return {value: style.id, displayValue: style.name};
                });
                formElement.elementConfig.options = optionsStyle;
                if (optionsStyle.length > 0 && formElement.value === '') {
                    formElement.value = optionsStyle[0].value;
                }        
                if (artistTransformed !== null) {
                    formElement.value = artistTransformed.style;
                }            
            }
            else if (key === 'nationality') {
                const optionsNationality = nationalitiesCpy.map(nationality => {
                    return {value: nationality.id, displayValue: nationality.name};
                });
                formElement.elementConfig.options = optionsNationality;
                if (optionsNationality.length > 0 && formElement.value === '') {
                    formElement.value = optionsNationality[0].value;
                }        
                if (artistTransformed !== null) {
                    formElement.value = artistTransformed.nationality;
                }            
            }
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
            form = (
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
        }    
        let artistLbl = 'Edit Artist';
        if (this.props.match.params.id === undefined) {
            artistLbl = 'New Artist';
        }
        return (
                <div className={classes.Artist}>
                    <Label>{artistLbl}</Label>
                    {form}                    
                </div>
        );            
    }
}

const mapStateToProps = state => {
    return {
        styles: state.commons.styles,
        nationalities: state.commons.nationalities,
        loading: state.commons.loading,
        access_token: state.auth.access_token,
        artist: state.recordStore.artist,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetStyles: (token) => dispatch(actions.getStyles(token)),
        onGetNationalities: (token) => dispatch(actions.getNationalities(token)),
        onSaveArtist: (artist, token, history) => dispatch(actions.saveArtist(artist, token, history)),
        onGetArtistById: (token, id) => dispatch(actions.getArtistById(token, id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Artist, axios));