import React, { Component } from 'react';
import { connect } from 'react-redux'
import classes from './Profile.module.css';
import { Button } from '@material-ui/core'

import { logOut, updateProfile } from '../../Store/Actions/AuthActions'
import { Redirect } from 'react-router-dom';
import Form from '../../Components/Auth/Form';
import { validateEmail } from '../../util';

class Profile extends Component {
    state = {
        isEditing: false,
        fields: [
            { id: "email", title: "E-mail", type: "email", validation: () => validateEmail(this.state.user.email) },
            { id: "password", title: "Password", type: "password" },
            { id: "firstName", title: "First Name", type: "text" },
            { id: "lastName", title: "Last name", type: "text" },
        ],
        user: {}
    }
    onChange = (field, value) => {
        this.setState({
            user: {
                ...this.state.user,
                [field]: value
            }
        })
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            for (let key in this.props.user) {
                if (this.state.user[key] !== this.props.user[key]) {
                    this.setState({ user: this.props.user })
                    break;
                }
            }
        }
    }

    onProfileSave = () => {
        this.props.updateProfile(this.state.user);
        this.setState({ isEditing: false })
    }

    render() {

        setTimeout(() => {
            if (!(this.props.user && this.props.user.token)) {
                return (
                    <Redirect to="/auth" />
                );
            }
        })


        const notEditing = (<div className={classes.ProfileContainer}>
            <img src={this.props.user.avatarUrl} alt="" />
            <h3>
                {this.props.user.firstName} {this.props.user.lastName}
            </h3>
            <p><b>Email:</b> {this.props.user.email}</p>
            <p><b>BirthDate:</b> {this.props.user.birthDate}</p>
            <p><b>Gender:</b> {this.props.user.sex}</p>
            <p><b>JS Experience:</b> {this.props.user.jsExperience}</p>
            <p><b>React Experience:</b> {this.props.user.reactExperience}</p>
            <Button onClick={() => this.setState({ isEditing: true })} style={{
                backgroundColor: '#70587C',
                color: "white",
                fontWeight: "bold",
                marginRight: "15px"
            }} >Edit</Button>

            <Button onClick={this.props.logOut} style={{
                color: '#70587C',
                backgroundColor: "white",
                fontWeight: "bold",
                border: "1px solid #70587C"
            }} >Log Out</Button>
        </div >)

        const editing = (<div className={classes.ProfileContainer}>
            <Form
                fields={this.state.fields}
                user={this.state.user}
                onChange={this.onChange}>
            </Form>
            <Button onClick={this.onProfileSave}
                style={{
                    backgroundColor: '#70587C',
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "15px"
                }}>Save</Button>
            <Button onClick={() => this.setState({ isEditing: false })} style={{
                color: '#70587C',
                backgroundColor: "white",
                fontWeight: "bold",
                border: "1px solid #70587C"
            }} >Cancel</Button>
        </div>)
        return this.state.isEditing ? editing : notEditing;
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