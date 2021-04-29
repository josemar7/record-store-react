import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/home">Home</NavigationItem>
        <NavigationItem link="/test">Test</NavigationItem>
        <NavigationItem link="/1">Test with ID</NavigationItem>
        <NavigationItem link="/params?quick-submit=true#submit">Test with params</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/artists">Artists</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/records">Records</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> :
            <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;