import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import Pagination from '../../UI/Pagination/Pagination';
import Table from '../../UI/Table/Table';

class Home extends Component {

    state = {
        show: false,
        page: 0,
        size: 5
    };

    componentDidMount() {        
        this.props.onGetRecordsPaged(this.props.access_token, this.state.page, this.state.size);   
    }

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
                    token={this.props.access_token}
                    type='records'
                    shopping={true}/>
                    <Pagination page={this.props.page} currentPage={this.state.page}
                    onClickPage={this.onClickPage}/>
                </Aux>
            );
        }
        return (
            <div>
                {records}
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Home, axios));