import React from 'react';

import classes from './Image.css';

const Image = (props) => {
    return <img className={classes.Image}
        src={props.src} title={props.title} />;
};

export default Image;