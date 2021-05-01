import React from 'react';

import classes from './Image.css';

const Image = (props) => {
    let mywidth = '250px';
    if (props.width !== undefined) {
        mywidth = props.width + 'px';
    }
    return <img className={classes.Image} style={{width: mywidth}}
        src={props.src} title={props.title} />;
};

export default Image;