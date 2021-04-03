import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import Label from '../../../UI/Label/Label';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './Artist.css';
import * as actions from '../../../store/actions/index';
import { updateObject } from "../../../shared/utility";

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
        loading: false,
        isEdit: false,
        loaded: false
    };

    componentDidMount() {     
        this.props.onGetStyles(this.props.access_token);
        this.props.onGetNationalities(this.props.access_token);
        if (this.props.match.params.id !== undefined) {
            this.props.onGetArtistById(this.props.access_token, this.props.match.params.id);   
        }        
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.loaded && props.match.params.id !== undefined 
            && props.styles.length > 0 && props.nationalities.length > 0 && props.artist !== null) {
            const stylesCpy = [...props.styles];
            const nationalitiesCpy = [...props.nationalities];    
            const styleFound = stylesCpy.find(e => e.name === props.artist.style);
            const nationalityFound = nationalitiesCpy.find(n => n.name === props.artist.nationality);
            const updatedControls = updateObject(state.artistForm, {
                'style': updateObject(state.artistForm['style'], {
                    value: styleFound.id,
                    valid: true
                }),
                'nationality': updateObject(state.artistForm['nationality'], {
                    value: nationalityFound.id,
                    valid: true
                }),
                'name': updateObject(state.artistForm['name'], {
                    value: props.artist.name,
                    valid: true
                })
            });
            return {artistForm: updatedControls, formIsValid: true, isEdit: true, loaded: true };    
        }
        else if (!state.loaded && props.match.params.id === undefined 
            && props.styles.length > 0 && props.nationalities.length > 0) {
                const stylesCpy = [...props.styles];
                const nationalitiesCpy = [...props.nationalities];    
                const updatedControls = updateObject(state.artistForm, {
                    'style': updateObject(state.artistForm['style'], {
                        value: stylesCpy[0].id,
                        valid: true
                    }),
                    'nationality': updateObject(state.artistForm['nationality'], {
                        value: nationalitiesCpy[0].id,
                        valid: true
                    })
                });  
                return {artistForm: updatedControls, loaded: true };      
            }
        return state;
    }

    artistHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let name;
        let idNationality;
        let idStyle;
        for (let formElementIdentifier in this.state.artistForm) {
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
        if (!this.state.isEdit) {
            this.props.onSaveArtist(artist, this.props.access_token, this.props.history);
        }
        else {
            this.props.onUpdateArtistById(artist, this.props.access_token, this.props.match.params.id, this.props.history);
        }        
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
                        disabled={!this.state.formIsValid}>Save</Button>   
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
        styles: state.style.styles,
        nationalities: state.commons.nationalities,
        loading: state.commons.loading,
        access_token: state.auth.access_token,
        artist: state.artist.artist,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetStyles: (token) => dispatch(actions.getStyles(token)),
        onGetNationalities: (token) => dispatch(actions.getNationalities(token)),
        onSaveArtist: (artist, token, history) => dispatch(actions.saveArtist(artist, token, history)),
        onGetArtistById: (token, id) => dispatch(actions.getArtistById(token, id)),
        onUpdateArtistById: (artist, token, id, history) => 
                                            dispatch(actions.updateArtistById(artist, token, id, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Artist, axios));