import React, {Component} from 'react';
import {connect} from 'react-redux';

import Table from '../../UI/Table/Table';
import Button from '../../UI/Button/Button';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Artist from '../Artist/Artist';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Spinner from '../../UI/Spinner/Spinner';

class Artists extends Component {

    state = {
        newArtist: false
    };

    componentDidMount() {
        this.props.onGetArtists();     
    }

    onAddArtistHandler = () => {
        this.setState({newArtist: true});
    };

    render() {
        const artistsCpy = [...this.props.artists];
        const header = {
            id: 'Id',
            name: 'Name',
            style: 'Style',
            nationality: 'Nationality'
        };
        let artist = this.state.newArtist ? <Artist/> : null;
        let artists = <Spinner/>;
        if (!this.props.loading) {
            artists = (
                <Aux>
                    <Table header={header}
                    data={artistsCpy}/>
                    <div style={{paddingTop: '10px'}}>
                        <Button
                        clicked={this.onAddArtistHandler}
                        disabled={false}>Add Artist</Button>
                    </div>
                    {artist}
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
        artists: state.recordStore.artists,
        loading: state.recordStore.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetArtists: () => dispatch(actions.getArtists())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Artists, axios));