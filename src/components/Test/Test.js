import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';
import Select from 'react-select';

import Aux from '../../hoc/Aux/Aux';
import TestItem from './TestItem/TestItem';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Test.css';
import Button from '../../UI/Button/Button';
import * as actions from '../../store/actions/index';
import Modal from '../../UI/Modal/Modal';
import Style from '../Style/Style';
import DialogConfirm from '../../UI/DialogConfirm/DialogConfirm';  

export const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ]; 
class Test extends Component {

    state = {
        showStyle: false,
        showConfirm: false,
        inputValue: '',
        selectedArtist: null,
        parsedArtists: []
    };

    componentDidMount() {
        this.props.onGetRecordsTest(null);   
        this.props.onGetArtistsFiltered(this.props.access_token, null);  
    }

    static getDerivedStateFromProps(props, state) {
        if(props.artists.length > 0) {
            const artistsCpy = [...props.artists];
            const parsedArtists = artistsCpy.map(a => {
                return {value: a.id, label: a.name};
            });   
            return {
                ...state,
                parsedArtists: parsedArtists
            };             
        }
        return state;
    }

    render() {     
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ]
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
        if(this.props.artistError) {
            this.props.history.replace('/auth');
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
                <br/>
                <Select options={options} />
                <div>
                    <pre>artist: "{this.state.selectedArtist}"</pre>
                    <Select
                    options={this.state.parsedArtists}
                    onChange={this.textChange}
                    />
                </div>
                <Modal modalClosed={() => {this.setState({showStyle: false});}}
                    show={this.state.showStyle}>
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

    textChange = inputValue => {
        console.log(inputValue);
        this.setState({ inputValue:inputValue.value });
    };

    filterColors = (inputValue) => {
        return colourOptions.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
    
    async loadOptions(inputValue) {
        if (inputValue.length === 0) {
            await this.props.onGetRecordsTest(null);
        }
        else if (inputValue.length > 3) {
            await this.props.onGetRecordsTest(inputValue);
        }
        return this.props.recordsTest.map(r => {
            return {value: r.id, label: r.name};
        });    
    } 

    async loadArtists(inputValue) {
        if (inputValue.length === 0) {
            await this.props.onGetArtistsFiltered(this.props.access_token, null);
        }
        else if (inputValue.length > 3) {
            await this.props.onGetArtistsFiltered(this.props.access_token, inputValue);
        }
        const artistsCpy = [...this.props.artists];
        return artistsCpy.map(a => {
            return {value: a.id, label: a.name};
        });    
    } 

    handleInputChange = (newValue) => {
        // const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue: newValue });
        return newValue;
    };

    handleArtistInputChange = newValue => {
        console.log(newValue);
        this.setState({ inputValue: newValue });
        return newValue;
    };

    onClickYes = () => {
        console.log('yeeeeeeeeees');
        this.setState({showConfirm: false});
    };

    onClickNo = () => {
        console.log('nooooooooooo');
        this.setState({showConfirm: false});
    };

    onClickDialogButton = () => {
        this.setState({showStyle: !this.state.showStyle});
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
        loading: state.test.loading,
        artists: state.artist.artists,
        artistError: state.artist.artistError,
        access_token: state.auth.access_token,
        loadingArtists: state.artist.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetRecordsTest: (name) => dispatch(actions.getRecordsTest(name)),
        onGetArtistsFiltered: (token, text) => dispatch(actions.getArtistsFiltered(token, text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
