import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { FaShoppingCart } from 'react-icons/fa';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/home">Home</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isAuthenticated && props.isAdmin ? <NavigationItem link="/artists">Artists</NavigationItem> : null}
        {props.isAuthenticated && props.isAdmin ? <NavigationItem link="/records">Records</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> :
            <NavigationItem link="/auth">Authenticate</NavigationItem>}
        <NavigationItem link="/cart">
            <FaShoppingCart style={{fontSize: '1.5em', paddingTop: '5px', color: 'white'}}/>
        </NavigationItem>            
    </ul>
);

export default navigationItems;