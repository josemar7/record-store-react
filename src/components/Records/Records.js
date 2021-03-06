import React, { Component } from 'react';
import RecordsFilter from './RecordsFilter/RecordsFilter';
import RecordsGrid from './RecordsGrid/RecordsGrid';
import classes from './Records.css';

class Records extends Component {

    render() {
        return (
            <div className={classes.Records}>
                <RecordsFilter/>
                <RecordsGrid history={this.props.history} />
            </div>
        );
    }
}

export default Records;