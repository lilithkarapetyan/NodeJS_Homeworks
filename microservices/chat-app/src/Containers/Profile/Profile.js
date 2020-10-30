import React, { Component } from 'react';
import { connect } from 'react-redux'
import classes from './Profile.module.css';
import { Button } from '@material-ui/core';

import { logOut, updateProfile } from '../../Store/Actions/AuthActions'
import { Redirect } from 'react-router-dom';
import Form from '../../Components/Auth/Form';
import { validateEmail } from '../../util';
import io from 'socket.io-client';

class Profile extends Component {
    state = {
        welcome: null,
        socket: null,
    }

    componentDidMount() {
        const socket = io('localhost:3002');
        this.setState({ ...this.state, socket });
        const token = sessionStorage.getItem('token')
        socket.on('connect', () => {
            socket
                .on('authenticated', function () {
                    console.log("passeddd")
                })
                .emit('authenticate', { token })
                .on('welcome', data => {
                    console.log(data)
                    this.setState({...this.state, welcome: data});
                })
        });
    }

    render() {
        setTimeout(() => {
            if (!(this.props.user && this.props.user.token)) {
                return (
                    <Redirect to="/auth" />
                );
            }
        })

        return (<div className={classes.ProfileContainer}>
            {this.state.welcome}
        </div>);
    }
}


const mapStateToProps = (state) => {

    return {
        user: state.auth.user || {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
        updateProfile: (payload) => dispatch(updateProfile(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);