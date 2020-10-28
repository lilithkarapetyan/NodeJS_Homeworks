import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = ( props ) => (
    <li className={classes.NavigationItem} onClick={props.clicked}>
        <NavLink 
            to={{
                pathname: props.link,
                name: props.name
            }}
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default NavigationItem;