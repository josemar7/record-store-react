import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import TestItem from './TestItem/TestItem';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Test.css';
import Button from '../../UI/Button/Button';
import * as actions from '../../store/actions/index';
import Modal from '../../UI/Modal/Modal';
import Style from '../Style/Style';
import DialogConfirm from '../../UI/DialogConfirm/DialogConfirm';
class Test extends Component {

    state = {
        show: false,
        showConfirm: false
    };

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
                <div>
                    <Button clicked={this.onClickDialogButton}>Click me</Button>
                    <Button clicked={this.onClickConfirmButton}>Confirm me</Button>
                </div>
                <Modal modalClosed={() => {this.setState({show: false});}}
                    show={this.state.show}>
                        <Style origin={this}/>
                </Modal>
                <Modal modalClosed={() => {this.setState({showConfirm: false});}}
                    show={this.state.showConfirm}>
                        <DialogConfirm onClickYes={this.onClickYes} onClickNo={this.onClickNo}
                        message="Are you sure want to click me?"/>
                </Modal>
            </Aux>
        );
    }

    onClickYes = () => {
        console.log('yeeeeeeeeees');
        this.setState({showConfirm: false});
    };

    onClickNo = () => {
        console.log('nooooooooooo');
        this.setState({showConfirm: false});
    };

    onClickDialogButton = () => {
        this.setState({show: !this.state.show});
    };

    onClickConfirmButton = () => {
        this.setState({showConfirm: !this.state.showConfirm});
    };

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
