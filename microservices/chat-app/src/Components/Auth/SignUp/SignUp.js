import React, { Component } from 'react';
import Form from '../Form'
import { Button } from '@material-ui/core'
import { register } from '../../../Fetch/Users'
import { validateEmail } from '../../../util';

class SignUp extends Component {
    state = {
        fields: [
            { id: "email", title: "E-mail", type: "email", validation: () => validateEmail(this.state.user.email)},
            { id: "password", title: "Password", type: "password" },
            { id: "firstName", title: "First Name", type: "text" },
            { id: "lastName", title: "Last name", type: "text" },
        ],
        user: {
            email: undefined,
            password: "",
            firstName: "",
            lastName: "",
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

    onSignUp = () => {
        const user = { ...this.state.user }
        user.jsExperience *= 1;
        user.reactExperience *= 1;
        register(user).then((data) => {
            this.props.signedIn();
        })
    }

    render() {
        return (
            <div>
                <Form fields={this.state.fields} user={this.state.user} onChange={this.onChange}></Form>
                <Button variant="outlined" color="primary" onClick={this.onSignUp}>Sign Up</Button>
            </div>
        );
    }
}

export default SignUp;