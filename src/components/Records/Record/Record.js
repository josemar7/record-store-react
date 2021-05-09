import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { withAlert } from "react-alert";

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
        isEdit: false,
        loaded: false,
        showArtist: false,
        showFormat: false
    };

    componentDidMount() {    
        this.props.onGetFormats();
        this.props.onGetArtists();
        if (this.props.match.params.id !== undefined) {
            this.props.onGetRecordById(this.props.match.params.id);   
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

    onClickModalFormat = () => {
        this.setState({showFormat: !this.state.showFormat});
    };

    onClickModalArtist = () => {
        this.setState({showArtist: !this.state.showArtist});
    };

    static loadRecordForm = (props, state) => {
        const formatsCpy = [...props.formats];
        const artistsCpy = [...props.artists];
        let updatedControls = null;
        let stateUpdated = state;
        if (props.match.params.id !== undefined && props.record !== null) {  
            const formatFound = formatsCpy.find(e => e.id === props.record.format.id);
            const artistFound = artistsCpy.find(n => n.id === props.record.artist.id);
            updatedControls = updateObject(state.recordForm, {
                'format': updateObject(state.recordForm['format'], {
                    value: formatFound,
                    valid: true
                }),
                'artist': updateObject(state.recordForm['artist'], {
                    value: artistFound,
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
                'price': updateObject(state.recordForm['price'], {
                    value: props.record.price,
                    valid: true
                }),
                'image': updateObject(state.recordForm['image'], {
                    value: props.record.image,
                    valid: true
                })
            });
            stateUpdated = {...state, recordForm: updatedControls, formIsValid: true, isEdit: true, loaded: true };
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
            stateUpdated = {...state, recordForm: updatedControls, loaded: true };
        }
        return stateUpdated;
    };

    recordHandler = (event) => {
        event.preventDefault();
        let name;
        let units;
        let idArtist;
        let idFormat;
        let image;
        let price;
        for (let formElementIdentifier in this.state.recordForm) {
            if (formElementIdentifier === 'name') {
                name = this.state.recordForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'artist') {
                idArtist = this.state.recordForm[formElementIdentifier].value.id;
            }
            else if (formElementIdentifier === 'format') {
                idFormat = this.state.recordForm[formElementIdentifier].value.id;
            }
            else if (formElementIdentifier === 'units') {
                units = this.state.recordForm[formElementIdentifier].value;
            }
            else if (formElementIdentifier === 'price') {
                price = this.state.recordForm[formElementIdentifier].value;
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
            image: image,
            price: price
        };
        if (!this.state.isEdit) {
            this.props.onSaveRecord(record, this.props.access_token, this.props.history);
        }
        else {
            this.props.onUpdateRecordById(record, this.props.access_token, this.props.match.params.id, this.props.history);
        }        
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.recordForm) {
            const formElement = this.state.recordForm[key];
            if (key === 'format') {
                formElement.elementConfig.options = this.props.formats;
            }
            else if (key === 'artist') {
                formElement.elementConfig.options = this.props.artists;
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
        let recordRedirect = null;
        if (this.props.saved) {
            if (this.props.match.params.id === undefined) {
                this.props.alert.success('Record added successfully');
            }
            else {
                this.props.alert.success('Record updated successfully');
            }
            recordRedirect = <Redirect to="/records"/>
        }
        return(
            <div className={classes.Record}>
                {recordRedirect}
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
        loadingRecord: state.record.loading,
        access_token: state.auth.access_token,
        record: state.record.record,
        saved: state.record.saved
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetFormats: () => dispatch(actions.getFormats()),
        onGetArtists: () => dispatch(actions.getArtists()),
        onSaveRecord: (record, token) => dispatch(actions.saveRecord(record, token)),
        onGetRecordById: (id) => dispatch(actions.getRecordById(id)),
        onUpdateRecordById: (record, token, id) => 
                                            dispatch(actions.updateRecordById(record, token, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withAlert()(Record), axios));