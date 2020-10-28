import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
    return (
    <ul className={classes.NavigationItems}>
        {
            props.navItems.map(item => (
                <NavigationItem link={item.path} name={item.name} key={item.path} clicked={props.closed}>{item.name}</NavigationItem>
            ))
        }
    </ul>
)};

export default navigationItems;