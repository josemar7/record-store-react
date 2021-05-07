import React, {Component} from 'react';
import {connect} from 'react-redux';

import Table from '../../UI/Table/Table';
import Button from '../../UI/Button/Button';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import DialogConfirm from '../../UI/DialogConfirm/DialogConfirm';
import Pagination from '../../UI/Pagination/Pagination';
class Artists extends Component {

    state = {
        show: false,
        page: 0,
        size: 5
    };

    componentDidMount() {   
        this.props.onGetArtistsPaged(this.state.page, this.state.size);   
    }

    onAddArtistHandler = () => {        
        this.props.history.replace('/artists/new');
    }

    onClickDelete = (token, id) => {        
        this.setState({show: !this.state.show,
            token: token,
            id: id});
    }

    onClickYes = () => {
        this.props.onDeleteArtistById(this.state.token, this.state.id);
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
                width: '600px'
            },
            style: {
                label: 'Style',
                width: '200px'
            },
            nationality: {
                label: 'Nationality',
                width: '200px'
            }
        };
    };

    getData = () => {
        let result = [];
        if (this.props.page !== undefined) {
            const artistsCpy = [...this.props.page.result];
            result = artistsCpy.map(artistCpy => {
                return ({
                    id: artistCpy.id,
                    name: artistCpy.name,
                    style: artistCpy.style.name,
                    nationality: artistCpy.nationality.name
                });
            });    
        }
        return result;
    };

    onClickPage = page => {
        this.setState({page: page});
        this.props.onGetArtistsPaged(page, this.state.size);        
    };

    render() {
        const header = this.getHeader();
        const artistsTransformed = this.getData();
        let artists = <Spinner/>;
        if (!this.props.loading) {
            artists = (
                <Aux>
                    <Table header={header}
                    data={artistsTransformed}
                    actions={true}
                    delete={this.onClickDelete}
                    token={this.props.access_token}
                    type='artists'/>
                    <Pagination page={this.props.page} currentPage={this.state.page}
                    onClickPage={this.onClickPage}/>
                    <div style={{paddingTop: '10px'}}>
                        <Button
                        clicked={this.onAddArtistHandler}
                        disabled={false}>Add Artist</Button>
                    </div>
                </Aux>
            );
        }
        return (
            <Aux>
                <Modal modalClosed={() => {this.setState({show: false});}}
                show={this.state.show}>
                    <DialogConfirm onClickYes={this.onClickYes} onClickNo={this.onClickNo}
                    message="Are you sure want to delete the artist?"/>
                </Modal>    
                <div>
                    {artists}                    
                </div>
            </Aux>            
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.artist.page,
        loading: state.artist.loading,
        access_token: state.auth.access_token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetArtistsPaged: (page, size) => dispatch(actions.getArtistsPaged(page, size)),
        onDeleteArtistById: (token, id) => dispatch(actions.deleteArtistById(token, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Artists, axios));