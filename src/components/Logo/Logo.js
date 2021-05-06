import React from 'react';

import burgerLogo from '../../assets/images/pngwing.com.png';
import classes from './Logo.css';

const logo = (props) => {
    const height = {height: props.height};
    return (
        <div className={classes.Logo} style={height}>
            <img src={burgerLogo} alt="Record Shop"/>
        </div>
    );
}

export default logo;