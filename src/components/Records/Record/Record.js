import React, { Component } from "react";
import { connect } from "react-redux";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import Spinner from "../../../UI/Spinner/Spinner";
import { updateObject } from "../../../shared/utility";
import Label from '../../../UI/Label/Label';
import classes from './Record.css';
import Modal from "../../../UI/Modal/Modal";
import Artist from "../../Artists/Artist/Artist";
import Format from "../../Format/Format";
import { getForm, recordForm } from "../../../shared/formsUtils";

class Record extends Component {

    state = {
        recordForm: recordForm,
        formIsValid: false,
        loading: false,
        isEdit: false,
        loaded: false,
        showArtist: false,
        showFormat: false
    };

    componentDidMount() {    
        this.props.onGetFormats(this.props.access_token);
        this.props.onGetArtists(this.props.access_token);
        if (this.props.match.params.id !== undefined) {
            this.props.onGetRecordById(this.props.access_token, this.props.match.params.id);   
        }
        let updatedControls = null; 
        updatedControls = updateObject(this.state.recordForm, {
            'format': updateObject(this.state.recordForm.format, {
                onClickModal: this.onClickModalFormat
            }),
            'artist': updateObject(this.state.recordForm.artist, {
                onClickModal: this.onClickModalArtist
            })
        });
        this.setState({recordForm: updatedControls});
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.loaded && props.formats.length > 0 && props.artists.length > 0) {
            return Record.loadRecordForm(props, state);
        }
        return state;
    }

    static loadRecordForm = (props, state) => {
        const formatsCpy = [...props.formats];
        const artistsCpy = [...props.artists];    
        let updatedControls = null;
        let stateUpdated = state;
        if (props.match.params.id !== undefined && props.record !== null) {
            const formatFound = formatsCpy.find(e => e.name === props.record.format.name);
            const artistFound = artistsCpy.find(n => n.name === props.record.artist.name);
            updatedControls = updateObject(state.recordForm, {
                'format': updateObject(state.recordForm['format'], {
                    value: formatFound.id,
                    valid: true
                }),
                'artist': updateObject(state.recordForm['artist'], {
                    value: artistFound.id,
                    valid: true
                }),
                'name': updateObject(state.recordForm['name'], {
                    value: props.record.name,
                    valid: true
                }),
                'units': updateObject(state.recordForm['units'], {
                    value: props.record.units,
                    valid: true
                }),
                'image': updateObject(state.recordForm['image'], {
                    value: props.record.image,
                    valid: true
                })
            });
            stateUpdated = {recordForm: updatedControls, formIsValid: true, isEdit: true, loaded: true };
        }
        else if (props.match.params.id === undefined) {
            updatedControls = updateObject(state.recordForm, {
                'format': updateObject(state.recordForm['format'], {
                    value: formatsCpy[0].id,
                    valid: true
                }),
                'artist': updateObject(state.recordForm['artist'], {
                    value: artistsCpy[0].id,
                    valid: true
                })
            });  
            stateUpdated = {recordForm: updatedControls, loaded: true };
        }
        return stateUpdated;
    };

    recordHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let name;
        let units;
        let idArtist;
        let idFormat;
        let image;
        for (let formElementIdentifier in this.state.recordForm) {
            if (formElementIdentifier === 'name') {
                name = this.state.recordForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'artist') {
                idArtist = this.state.recordForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'format') {
                idFormat = this.state.recordForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'units') {
                units = this.state.recordForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'image') {
                image = this.state.recordForm[formElementIdentifier].value;
            }
        }
        const record = {
            name: name,
            units: units,
            artist: {
                id: idArtist
            },
            format: {
                id: idFormat
            },
            image: image
        };
        if (!this.state.isEdit) {
            this.props.onSaveRecord(record, this.props.access_token, this.props.history);
        }
        else {
            this.props.onUpdateRecordById(record, this.props.access_token, this.props.match.params.id, this.props.history);
        }        
    };

    onClickModalFormat = () => {
        this.setState({showFormat: !this.state.showFormat});
    };

    onClickModalArtist = () => {
        this.setState({showArtist: !this.state.showArtist});
    };

    formatModal = () => {
        return (
            <Modal modalClosed={() => {this.setState({showFormat: false});}}
            show={this.state.showFormat}>
                <Format origin={this}/>
            </Modal>    
        );
    };

    artistModal = () => {
        return (
            <Modal modalClosed={() => {this.setState({showArtist: false});}}
            show={this.state.showArtist}>
                <Artist origin={this}/>
            </Modal>    
        );
    };

    render() {
        const formatsCpy = [...this.props.formats];
        const artistsCpy = [...this.props.artists];
        const formElementsArray = [];
        for (let key in this.state.recordForm) {
            const formElement = this.state.recordForm[key];
            if (key === 'format') {
                const optionsFormat = formatsCpy.map(format => {
                    return {value: format.id, displayValue: format.name};
                });
                formElement.elementConfig.options = optionsFormat;
            }
            else if (key === 'artist') {
                const optionsArtist = artistsCpy.map(artist => {
                    return {value: artist.id, displayValue: artist.name};
                });
                formElement.elementConfig.options = optionsArtist;
            }
            formElementsArray.push({
                id: key,
                config: formElement
            });
        }
        let form = null;
        if (this.props.loadingRecord) {
            form = <Spinner/>;
        }
        else {
            form = getForm(formElementsArray, this.recordHandler, this, 'recordForm',
            this.state.recordForm.image.value);
        }    
        let recordLbl = 'Edit Record';
        if (this.props.match.params.id === undefined) {
            recordLbl = 'New Record';
        }
        return(
            <div className={classes.Record}>
                <Label>{recordLbl}</Label>
                {form}       
                {this.formatModal()}
                {this.artistModal()}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        formats: state.format.formats,
        artists: state.artist.artists,
        loadingFormats: state.format.loading,
        loadingArtists: state.artist.loading,
        loadingRecord: state.record.loading,
        access_token: state.auth.access_token,
        record: state.record.record,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetFormats: (token) => dispatch(actions.getFormats(token)),
        onGetArtists: (token) => dispatch(actions.getArtists(token)),
        onSaveRecord: (record, token, history) => dispatch(actions.saveRecord(record, token, history)),
        onGetRecordById: (token, id) => dispatch(actions.getRecordById(token, id)),
        onUpdateRecordById: (record, token, id, history) => 
                                            dispatch(actions.updateRecordById(record, token, id, history))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Record, axios));