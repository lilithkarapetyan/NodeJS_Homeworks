import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Login from '../../Components/Auth/Login/Login'
import SignUp from '../../Components/Auth/SignUp/SignUp'
import classes from './Auth.module.css'

class AuthContainer extends Component {
    state = {
        loginPage: true
    }

    changeMode = () => {
        this.setState(prev => ({ loginPage: !prev.loginPage }))
    }

    render() {
        let form = <Login {...this.props}/>
        if (!this.state.loginPage) {
            form = <SignUp {...this.props} signedIn={() => this.setState({loginPage: true})}/>
        }

        return (
            <div className={classes.Container}>
                <div style={{ width: '220px', margin: "auto" }}>
                    {form}
                    <Button onClick={this.changeMode}>{this.state.loginPage ? "Sign Up" : "Login"}</Button>
                </div>
            </div>
        );
    }
}


export default AuthContainer;