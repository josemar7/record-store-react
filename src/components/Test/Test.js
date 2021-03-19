import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import TestItem from './TestItem/TestItem';
import * as actions from '../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

import classes from './Test.css';

class Test extends Component {

    componentDidMount() {
        this.props.onGetRecordsTest();     
    }

    render() {     
        let result = 'My testing component!!!';
        if (+this.props.match.params.id === 1) {
            result += ' with parameter = ' + this.props.match.params.id;
        }   
        if (+this.props.match.params.id === 2) {
            result += ' with parameter = ' + this.props.match.params.id;
        }   
        if (this.props.location.hash) {
            result += ' hash = ' + this.props.location.hash;
        } 
        if (this.props.location.search) {
            result += ' search = ' + this.props.location.search;
        } 
        let records = <Spinner/>;
        if (!this.props.loading) {
            records = this.props.recordsTest.map(item => {
                return (
                <tr 
                onClick={() => this.onClickHandler(item.id)}
                key={item.id}>
                    <td>{item.id} </td>
                    <td>{item.name} </td>
                </tr>);
            });
            records = <table><tbody>{records}</tbody></table>;
        }
        return (
            <Aux>
                <div className={classes.mydiv}>{result}</div>
                <br/>
                {records} 
                <Route path={this.props.match.url + '/:id'} component={TestItem}/>                                              
            </Aux>
        );
    }

    onClickHandler(id) {
        this.props.history.push({pathname: '/test/' + id});
    }

}

const mapStateToProps = state => {
    return {
        recordsTest: state.test.recordsTest,
        loading: state.test.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecordsTest: () => dispatch(actions.getRecordsTest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
