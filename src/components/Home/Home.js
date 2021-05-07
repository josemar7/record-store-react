import React, {Component} from 'react';
import { connect } from 'react-redux';
import {FaShoppingCart} from 'react-icons/fa';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import Pagination from '../../UI/Pagination/Pagination';
import classes from './Home.css';
import Image from '../../UI/Image/Image';
import RecordsFilter from '../Records/RecordsFilter/RecordsFilter';
import RecordsGrid from '../Records/RecordsGrid/RecordsGrid';
import HomeGrid from './HomeGrid/HomeGrid';
class Home extends Component {

    state = {
        show: false,
        page: 0,
        size: 10
    };

    componentDidMount() {        
        this.props.onGetRecordsPaged(this.state.page, this.state.size);   
    }

    onClickPage = page => {
        this.setState({page: page});
        this.props.onGetRecordsPaged(page, this.state.size);        
    };

    // render() {
    //     let recordsCpy = [];
    //     if (this.props.page !== undefined) {
    //         recordsCpy = [...this.props.page.result];
    //     }
    //     let records = <Spinner/>;
    //     if (!this.props.loading) {
    //         const recordsDiv = recordsCpy.map((value, i) => {
    //             return (
    //                 <div key={value.id} className={classes.Inline}>
    //                     <Image src={value.image} width={150}/>
    //                     <div className={classes.Card}>
    //                         <div style={{fontWeight: 'bold'}}>{value.artist.name}</div>
    //                         <div>{value.name}</div>                            
    //                         <div>{value.format.name}</div>
    //                         <div><a href='#'><FaShoppingCart style={{fontSize: '1.5em', paddingTop: '5px', color: 'black'}}/></a></div>
    //                     </div>
    //                 </div>
    //             );
    //         });
    //         records = (
    //             <div>
    //                 <div className={classes.Centered}>
    //                 {recordsDiv}
    //                 </div>                    
    //                 <Pagination page={this.props.page} currentPage={this.state.page}
    //                 onClickPage={this.onClickPage}/>
    //             </div>
    //         );
    //     }
    //     return (
    //         <div>
    //             {records}
    //         </div>
    //     );
    // }

    render() {
        return (
            <div className={classes.Records}>
                <RecordsFilter/>
                <HomeGrid/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.record.page,
        loading: state.record.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecordsPaged: (page, size) => dispatch(actions.getRecordsPaged(page, size))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Home, axios));