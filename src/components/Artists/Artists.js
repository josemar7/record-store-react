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

class Artists extends Component {

    state = {
        show: false
    };

    componentDidMount() {   
        this.props.onGetArtists(this.props.access_token, false);   
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
                width: '400px'
            },
            style: {
                label: 'Style',
                width: '50px'
            },
            nationality: {
                label: 'Nationality',
                width: '50px'
            }
        };
    };

    getData = () => {
        const artistsCpy = [...this.props.artists];
        return artistsCpy.map(artistCpy => {
            return ({
                id: artistCpy.id,
                name: artistCpy.name,
                style: artistCpy.style.name,
                nationality: artistCpy.nationality.name
            });
        });
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
        artists: state.artist.artists,
        loading: state.artist.loading,
        access_token: state.auth.access_token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetArtists: (token) => dispatch(actions.getArtists(token)),
        onDeleteArtistById: (token, id) => dispatch(actions.deleteArtistById(token, id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Artists, axios));