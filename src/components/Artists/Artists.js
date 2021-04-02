import React, {Component} from 'react';
import {connect} from 'react-redux';

import Table from '../../UI/Table/Table';
import Button from '../../UI/Button/Button';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../UI/Spinner/Spinner';

class Artists extends Component {

    componentDidMount() {        
        this.props.onGetArtists(this.props.access_token);   
    }

    onAddArtistHandler = () => {        
        this.props.history.replace('/artists/new');
    };

    render() {
        const artistsCpy = [...this.props.artists];
        const header = {
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
        let artists = <Spinner/>;
        if (!this.props.loading) {
            artists = (
                <Aux>
                    <Table header={header}
                    data={artistsCpy}
                    actions={true}
                    delete={this.props.onDeleteArtistById}
                    token={this.props.access_token}/>
                    <div style={{paddingTop: '10px'}}>
                        <Button
                        clicked={this.onAddArtistHandler}
                        disabled={false}>Add Artist</Button>
                    </div>
                </Aux>
            );
        }
        return (
            <div>
                {artists}
            </div>
            
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