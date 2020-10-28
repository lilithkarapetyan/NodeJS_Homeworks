import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'

import Form from '../Form'
import formClasses from '../Form.module.css'
import { login } from '../../../Fetch/Users'
import { userLoggedIn } from '../../../Store/Actions/AuthActions'
import { validateEmail } from '../../../util';

class Login extends Component {
    state = {
        fields: [
            { id: "email", title: "E-mail", type: "email", validation: () => validateEmail(this.state.user.email) },
            { id: "password", title: "Password", type: "password" }
        ],
        user: {
            email: undefined,
            password: ""
        }
    }

    onChange = (field, value) => {
        this.setState({
            user: {
                ...this.state.user,
                [field]: value
            }
        })
    }

    onLogin = () => {
        const { from } = this.props.location.state || { from: { pathname: "/topics" } };
        const history = this.props.history
        login(this.state.user).then(data => {
            this.props.userLoggedIn(data);
            history.replace(from);
        })
    }

    render() {
        return (
            <div className={formClasses.FormContainer}>
                <Form fields={this.state.fields} user={this.state.user} onChange={this.onChange}></Form>
                <Button variant="outlined" color="primary" onClick={this.onLogin}>Log in</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isAuth: !!state.auth.token }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoggedIn: (data) => dispatch(userLoggedIn(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);