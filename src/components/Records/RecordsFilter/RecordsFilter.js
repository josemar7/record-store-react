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
                if (key === 'format' || key === 'style') {
                    if (formElement.value.id !== null) {
                        filter[key] = formElement.value.name;
                    }                    
                }
                else {
                    filter[key] = formElement.value;
                }    
            }
        }
        this.props.onSetFilter(filter);
        this.props.onGetRecordsFiltered(this.props.access_token, filter, 0, 5);
    };

    componentDidMount() {     
        this.props.onGetFormats(this.props.access_token);
        this.props.onGetStyles(this.props.access_token);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.fetchForm) {
            const formElement = this.state.fetchForm[key];
            if (key === 'format') {
                const formatsCpy = [...this.props.formats];
                formatsCpy.unshift({id: null, name: ''});
                formElement.elementConfig.options = formatsCpy;
            }
            if (key === 'style') {
                const stylesCpy = [...this.props.styles];
                stylesCpy.unshift({id: null, name: ''});
                formElement.elementConfig.options = stylesCpy;
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
        styles: state.style.styles,
        loadingFormats: state.format.loading,
        loadingRecords: state.record.loading,
        loadingStyles: state.style.loading,
        access_token: state.auth.access_token,
        page: state.record.page
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetFormats: (token) => dispatch(actions.getFormats(token)),
        onGetStyles: token => dispatch(actions.getStyles(token)),
        onGetRecordsFiltered: (token, filter, page, size) => dispatch(actions.getRecordsFiltered(token, filter, page, size)),
        onSetFilter: filter => dispatch(actions.setFilter(filter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RecordsFilter, axios));