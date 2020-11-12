import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

const Toolbar = (props) => {
    let chat = "";
    if (props.user) {
        chat = (
            <>
                <NavigationItem link="/chat" name="chat" style={{paddingBottom: "0px"}}>
                    Chat
                </NavigationItem>
            </>)
    }
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle show={!props.open} clicked={props.opened} />
            <nav className={classes.DisplayOnly}>
                <NavigationItems navItems={props.navItems}></NavigationItems>
            </nav>
            {chat}
        </header>
    )
};

export default Toolbar;