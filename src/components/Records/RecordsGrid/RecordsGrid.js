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
import Pagination from '../../../UI/Pagination/Pagination';
class RecordsGrid extends Component {

    state = {
        show: false,
        page: 0,
        size: 5
    };

    componentDidMount() {        
        this.props.onGetRecordsPaged(this.props.access_token, this.state.page, this.state.size);   
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
                width: '500px'
            },
            format: {
                label: 'Format',
                width: '100px'
            },
            artist: {
                label: 'Artist',
                width: '350px'
            }
        };
    };

    getData = () => {
        let result = [];
        if (this.props.page !== undefined) {
            const recordsCpy = [...this.props.page.result];
            result = recordsCpy.map(recordCpy => {
                return ({
                    id: recordCpy.id,
                    name: recordCpy.name,
                    format: recordCpy.format.name,
                    artist: recordCpy.artist.name
                });
            });    
        }
        return result;
    };

    onClickPage = page => {
        this.setState({page: page});
        this.props.onGetRecordsPaged(this.props.access_token, page, this.state.size);        
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
                    type='records'
                    shopping={true}/>
                    <Pagination page={this.props.page} currentPage={this.state.page}
                    onClickPage={this.onClickPage}/>
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
        page: state.record.page,
        loading: state.record.loading,
        access_token: state.auth.access_token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecordsPaged: (token, page, size) => dispatch(actions.getRecordsPaged(token, page, size)),
        onDeleteRecordById: (token, id) => dispatch(actions.deleteRecordById(token, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RecordsGrid, axios));