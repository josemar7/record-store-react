import React from 'react';

import classes from './Label.css';

const label = (props) => {
    return <div className={classes.Label}>{props.children}</div>;
};

export default label;