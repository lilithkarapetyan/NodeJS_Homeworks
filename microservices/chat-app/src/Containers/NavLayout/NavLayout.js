import React, { Component } from 'react';

import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux'

class NavLayout extends Component {
    state = {
        showSideDrawer: false,
        showModal: false,
        navItems: [
            {
                name: "Topics",
                path: "/topics"
            },
            {
                name: "Projects",
                path: "/projects"
            },
            {
                name: "Teams",
                path: "/teams"
            }]
    }


    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {

        return (
            <div style={{ padding: "60px 20px" }}>
                <Toolbar
                    user={this.props.user}
                    opened={this.sideDrawerToggleHandler}
                    navItems={this.state.navItems} />
                <SideDrawer
                    user={this.props.user}
                    navItems={this.state.navItems}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.auth.user
    });
}

export default connect(mapStateToProps)(NavLayout);