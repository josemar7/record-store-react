import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import * as actions from '../../../store/actions/index';

import classes from './TestItem.css';

class TestItem extends Component {

    state = {
        redirect: false
    };

    componentDidMount() {
        this.props.onGetRecordsTest();     
    }

    render() {
      console.log(this.props);
      let redirect = null;
      if (this.state.redirect) {
          redirect = <Redirect to="/test"/>;
      }
      let result = <div></div>;
      if (this.props.match.params.id) {
        if (!this.props.loading) {
            const record =  this.props.recordsTest.filter(record => {
                return record.id === +this.props.match.params.id;
              });
              if (record.length > 0) {
                result = (
                <Aux>                
                    {/* {redirect}     */}
                    <div className={classes.square}>
                        <p>{record[0].id}</p>
                        <p>{record[0].name}</p>
                    </div>
                </Aux>);
              }
              else {
                //   this.setState({redirect: true});
                this.props.history.replace('/test');
              }
        }
      }
      return result;
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

export default connect(mapStateToProps, mapDispatchToProps)(TestItem);
