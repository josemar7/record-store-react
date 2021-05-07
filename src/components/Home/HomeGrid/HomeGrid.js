import React, {Component} from 'react';
import { connect } from 'react-redux';

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
        show: false,
        page: 0,
        size: 5
    };

    componentDidMount() {        
        this.props.onGetRecordsFiltered(this.props.filter, this.state.page, this.state.size);   
    }


    onClickPage = page => {
        this.setState({page: page});
        this.props.onGetRecordsFiltered(this.props.filter, page, this.state.size);        
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
                            <div><a href='#'><FaShoppingCart style={{fontSize: '1.5em', paddingTop: '5px', color: 'black'}}/></a></div>
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
        filter: state.record.filter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecordsFiltered: (filter, page, size) => dispatch(actions.getRecordsFiltered(filter, page, size)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(HomeGrid, axios));