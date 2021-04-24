import React, {Component} from 'react';
import { connect } from 'react-redux';

import classes from './RecordsGrid.css';
import axios from 'axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import DialogConfirm from '../../../UI/DialogConfirm/DialogConfirm';
import Modal from '../../../UI/Modal/Modal';
import Button from '../../../UI/Button/Button';
import Table from '../../../UI/Table/Table';
import Aux from '../../../hoc/Aux/Aux';
import Spinner from '../../../UI/Spinner/Spinner';
class RecordsGrid extends Component {

    state = {
        show: false
    };

    componentDidMount() {        
        this.props.onGetRecords(this.props.access_token);   
    }

    onAddRecordHandler = () => {     
        this.props.history.replace('/records/new');
    }

    onClickDelete = (token, id) => {        
        this.setState({show: !this.state.show,
            token: token,
            id: id});
    }

    onClickYes = () => {
        this.props.onDeleteRecordById(this.state.token, this.state.id);
        this.setState({show: false});
    };

    onClickNo = () => {
        this.setState({show: false});
    };

    getHeader = () => {
        return {
            id: {
                label: 'Id',
                width: '30px'
            },
            name: {
                label: 'Name',
                width: '400px'
            },
            format: {
                label: 'Format',
                width: '50px'
            },
            artist: {
                label: 'Artist',
                width: '50px'
            }
        };
    };

    getData = () => {
        const recordsCpy = [...this.props.records];
        return recordsCpy.map(recordCpy => {
            return ({
                id: recordCpy.id,
                name: recordCpy.name,
                format: recordCpy.format.name,
                artist: recordCpy.artist.name
            });
        });    
    };

    render() {
        const header = this.getHeader();
        const recordsTransformed = this.getData();
        let records = <Spinner/>;
        if (!this.props.loading) {
            records = (
                <Aux>
                    <Table header={header}
                    data={recordsTransformed}
                    actions={true}
                    delete={this.onClickDelete}
                    token={this.props.access_token}
                    type='records'/>
                    <div style={{paddingTop: '10px'}}>
                        <Button
                        clicked={this.onAddRecordHandler}
                        disabled={false}>Add Record</Button>
                    </div>
                </Aux>
            );
        }
        return (
            <div className={classes.RecordsFilter}>
                <Modal modalClosed={() => {this.setState({show: false});}}
                show={this.state.show}>
                    <DialogConfirm onClickYes={this.onClickYes} onClickNo={this.onClickNo}
                    message="Are you sure want to delete the record?"/>
                </Modal>    
                <div>
                    {records}
                </div>
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        records: state.record.records,
        loading: state.record.loading,
        access_token: state.auth.access_token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecords: (token) => dispatch(actions.getRecords(token)),
        onDeleteRecordById: (token, id) => dispatch(actions.deleteRecordById(token, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RecordsGrid, axios));