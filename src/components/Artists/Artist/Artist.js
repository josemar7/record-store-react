import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Label from '../../../UI/Label/Label';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './Artist.css';
import * as actions from '../../../store/actions/index';
import { updateObject } from "../../../shared/utility";
import Modal from '../../../UI/Modal/Modal';
import Style from '../../Style/Style';
import Nationality from '../../Nationality/Nationality';
import { artistForm, getForm } from '../../../shared/formsUtils';

class Artist extends Component {

    state = {
        artistForm: artistForm,
        formIsValid: false,
        loading: false,
        isEdit: false,
        loaded: false,
        showStyle: false,
        showNationality: false
    };

    styleModal = () => {
        return (
            <Modal modalClosed={() => {this.setState({showStyle: false});}}
            show={this.state.showStyle}>
                <Style origin={this}/>
            </Modal>    
        );
    };

    nationalityModal = () => {
        return (
            <Modal modalClosed={() => {this.setState({showNationality: false});}}
            show={this.state.showNationality}>
                <Nationality origin={this}/>
            </Modal>    
        );
    };

    onClickModalStyle = () => {
        this.setState({showStyle: !this.state.showStyle});
    };

    onClickModalNationality = () => {
        this.setState({showNationality: !this.state.showNationality});
    };

    componentDidMount() {     
        this.props.onGetStyles(this.props.access_token);
        this.props.onGetNationalities(this.props.access_token);
        if (Artist.isidArtistInformed(this.props)) {
            this.props.onGetArtistById(this.props.access_token, this.props.match.params.id);   
        }    
        let updatedControls = null; 
        updatedControls = updateObject(this.state.artistForm, {
            'style': updateObject(this.state.artistForm.style, {
                onClickModal: this.onClickModalStyle
            }),
            'nationality': updateObject(this.state.artistForm.nationality, {
                onClickModal: this.onClickModalNationality
            })
        });
        this.setState({artistForm: updatedControls});
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.loaded && props.styles.length > 0 && props.nationalities.length > 0) {
            return Artist.loadArtistForm(props, state);
        }
        return state;
    }

    static loadArtistForm = (props, state) => {
        const stylesCpy = [...props.styles];
        const nationalitiesCpy = [...props.nationalities];    
        let updatedControls = null;
        let stateUpdated = state;
        if (Artist.isidArtistInformed(props) && props.artist !== null) {            
            const styleFound = stylesCpy.find(e => e.name === props.artist.style.name);
            const nationalityFound = nationalitiesCpy.find(n => n.name === props.artist.nationality.name);
            updatedControls = updateObject(state.artistForm, {
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
            stateUpdated = {artistForm: updatedControls, formIsValid: true, isEdit: true, loaded: true };
        }
        else if (!Artist.isidArtistInformed(props)) {
            updatedControls = updateObject(state.artistForm, {
                'style': updateObject(state.artistForm['style'], {
                    value: stylesCpy[0].id,
                    valid: true
                }),
                'nationality': updateObject(state.artistForm['nationality'], {
                    value: nationalitiesCpy[0].id,
                    valid: true
                })
            });  
            stateUpdated = {artistForm: updatedControls, loaded: true };
        }
        return stateUpdated;
    };

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
            form = getForm(formElementsArray, this.artistHandler, this, 'artistForm');
        }    
        let artistLbl = 'Edit Artist';
        if (!Artist.isidArtistInformed(this.props)) {
            artistLbl = 'New Artist';
        }
        return (
                <div className={classes.Artist}>
                    <Label>{artistLbl}</Label>
                    {form}       
                    {this.styleModal()}
                    {this.nationalityModal()}
                </div>
        );            
    }

    static isidArtistInformed = (props) => {
        return props.match !== undefined && props.match.params !== undefined &&
            props.match.params.id !== undefined;
    };
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