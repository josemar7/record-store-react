import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchForm, getForm } from '../../../shared/formsUtils';
import classes from './RecordsFilter.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../UI/Spinner/Spinner';
class RecordsFilter extends Component {

    state = {
        fetchForm: fetchForm
    };

    fetchHandler = (event) => {
        event.preventDefault();
        const filter = {};
        for (let key in this.state.fetchForm) {
            const formElement = this.state.fetchForm[key];
            if (formElement.value !== '' && formElement.value !== undefined) {
                if (key === 'format') {
                    filter[key] = formElement.value.name;
                }
                else {
                    filter[key] = formElement.value;
                }    
            }
        }
        this.props.onGetRecordsFiltered(this.props.access_token, filter);
    };

    componentDidMount() {     
        this.props.onGetFormats(this.props.access_token);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.fetchForm) {
            const formElement = this.state.fetchForm[key];
            if (key === 'format') {
                formElement.elementConfig.options = this.props.formats;
            }
            formElementsArray.push({
                id: key,
                config: formElement
            });
        }
        let form = null;
        if (this.props.loadingFormats) {
            form = <Spinner/>;
        }
        else {
            form = getForm(formElementsArray, this.fetchHandler, this, 'fetchForm', null, 'Fetch');
        }    
        return (
            <div className={classes.Artist}>
                {form}       
            </div>
        );            
    }
}

const mapStateToProps = state => {
    return {
        formats: state.format.formats,
        loadingFormats: state.format.loading,
        loadingRecords: state.record.loading,
        access_token: state.auth.access_token,
        records: state.record.records

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetFormats: (token) => dispatch(actions.getFormats(token)),
        onGetRecordsFiltered: (token, filter) => dispatch(actions.getRecordsFiltered(token, filter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RecordsFilter, axios));