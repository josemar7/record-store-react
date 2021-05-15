import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
                <Logo height='80px'/>
            </div>
            <div style={{fontFamily: 'Creepster', fontSize: '35px', color: 'whitesmoke'}}>Your Creepy Record Shop</div>
            <nav style={{width: '5%'}}>
                <NavigationItems isAuthenticated={props.isAuth} isAdmin={props.isAdmin} user={props.user}/>
            </nav>
            <div style={{color: 'white'}}>{props.user}</div>
        </header>
    );
};

export default toolbar;