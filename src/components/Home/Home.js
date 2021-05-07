import React, {Component} from 'react';

import classes from './Home.css';
import RecordsFilter from '../Records/RecordsFilter/RecordsFilter';
import HomeGrid from './HomeGrid/HomeGrid';
class Home extends Component {

    render() {
        return (
            <div className={classes.Records}>
                <RecordsFilter/>
                <HomeGrid/>
            </div>
        );
    }
}

export default Home;