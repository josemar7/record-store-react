import React, {Component} from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import Table from '../../UI/Table/Table';
import Pagination from '../../UI/Pagination/Pagination';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import Order from './Order/Order';

class Orders extends Component {

    state = {
        show: false,
        page: 0,
        size: 5
    };

    componentDidMount() {
        this.props.onGetOrders(this.props.user, this.state.page, this.state.size, this.props.access_token);   
    }

    getHeader = () => {
        return {
            id: {
                label: 'Id',
                width: '100px'
            },
            date: {
                label: 'Order date',
                width: '550px'
            }
        };
    };

    getData = () => {
        let result = [];
        if (this.props.page !== undefined) {
            const ordersCpy = [...this.props.page.result];
            result = ordersCpy.map(orderCpy => {
                return ({
                    id: orderCpy.id,
                    date: orderCpy.date
                });
            });    
        }
        return result;
    };

    onClickPage = page => {
        this.setState({page: page});
        this.props.onGetOrders(this.props.user, page, this.state.size, this.props.access_token);        
    };

    onClickEdit = id => {   
        this.setState({show: !this.state.show,
            id: id});
    }

    render() {
        const header = this.getHeader();
        const ordersTransformed = this.getData();
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = (
                <Aux>
                    <Table header={header}
                    data={ordersTransformed}
                    actions={true}
                    onlyEdit={true}
                    token={this.props.access_token}
                    type='orders'
                    openDialog={true}
                    edit={this.onClickEdit}/>
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
            <div>
                <Modal modalClosed={() => {this.setState({show: false});}}
                show={this.state.show}>
                    <Order id={this.state.id}/>
                </Modal>    
                {orders}
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.order.page,
        loading: state.order.loading,
        access_token: state.auth.access_token,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: (user, page, size, token) => dispatch(actions.getOrders(user, page, size, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withAlert()(Orders), axios));