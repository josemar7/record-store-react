import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../UI/Spinner/Spinner';
import Pagination from '../../../UI/Pagination/Pagination';
import Image from '../../../UI/Image/Image';
import { FaShoppingCart } from 'react-icons/fa';
import classes from './HomeGrid.css';
class HomeGrid extends Component {

    state = {
        page: 0,
        size: 5
    };

    componentDidMount() {        
        this.props.onGetRecordsFiltered({}, 0, 5);   
    }


    onClickPage = page => {
        this.setState({page: page});
        this.props.onGetRecordsFiltered(this.props.filter, page, this.state.size);        
    };

    checkRecord = record => {        
        const myCart = [...this.props.cart];        
        var filtered = myCart.filter( value => value.id === record.id);
        if (filtered.length === 0) {
            if (record.units > 0) {
                this.props.onAddCart({...record, cartUnits: 1});
                this.props.alert.success(`Record ${record.name} successfully added to the buying cart`);
            }
            else {
                this.props.alert.error(`You've overcame the units number of the record ${record.name}`);
            }
        }
        else {
            if (filtered[0].cartUnits + 1 <= record.units) {
                this.props.onUpdateItemUnits(filtered[0], filtered[0].cartUnits + 1);
                this.props.alert.success(`Record ${record.name} successfully added to the buying cart`);
            }
            else {
                this.props.alert.error(`You've overcame the units number of the record ${record.name}`);
            }
        }
    };

    render() {
        let recordsCpy = [];
        if (this.props.page !== undefined) {
            recordsCpy = [...this.props.page.result];
        }
        let records = <Spinner/>;
        if (!this.props.loading) {
            const recordsDiv = recordsCpy.map((value, i) => {
                return (
                    <div key={value.id} className={classes.Inline}>
                        <Image src={value.image} width={150}/>
                        <div className={classes.Card}>
                            <div style={{fontWeight: 'bold'}}>{value.artist.name}</div>
                            <div>{value.name}</div>                            
                            <div>{value.format.name}</div>
                            <div>
                                <a href='#' onClick={() => this.checkRecord(value)}>
                                    <FaShoppingCart style={{fontSize: '1.5em', paddingTop: '5px', color: 'black'}}/>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            });
            records = (
                <div>
                    <div className={classes.Centered}>
                    {recordsDiv}
                    </div>                    
                    <Pagination page={this.props.page} currentPage={this.state.page}
                    onClickPage={this.onClickPage}/>
                </div>
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
        filter: state.record.filter,
        cart: state.cart.cart
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecordsFiltered: (filter, page, size) => dispatch(actions.getRecordsFiltered(filter, page, size)),
        onAddCart: item => dispatch(actions.addCart(item)),
        onUpdateItemUnits: (item, units) => dispatch(actions.updateItemUnits(item, units))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withAlert()(HomeGrid), axios));