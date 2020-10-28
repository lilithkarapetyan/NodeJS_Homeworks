import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

const Toolbar = (props) => {
    let profile = "";
    if (props.user) {
        profile = (
                <NavigationItem link="/profile" name="profile" style={{paddingBottom: "0px"}}>
                    <img src={props.user.avatarUrl} style={{ height: "50px", borderRadius: "50%" }} alt="" />
                </NavigationItem>
            )
    }
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle show={!props.open} clicked={props.opened} />
            <nav className={classes.DisplayOnly}>
                <NavigationItems navItems={props.navItems}></NavigationItems>
            </nav>
            {profile}
        </header>
    )
};

export default Toolbar;