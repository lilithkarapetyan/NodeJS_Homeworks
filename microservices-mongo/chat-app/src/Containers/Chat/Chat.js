import React, { Component } from 'react';
import { connect } from 'react-redux'
import classes from './Chat.module.css';
import { Button } from '@material-ui/core';

import { logOut, updateChat } from '../../Store/Actions/AuthActions'
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

class Chat extends Component {
    state = {
        socket: null,
        message: '',
        messages: [],
    }

    componentDidMount() {
        const socket = io('localhost:3002');
        this.setState({ ...this.state, socket });
        const token = sessionStorage.getItem('token');
        socket.on('connect', () => {
            socket
                .on('authenticated', () => console.log("authenticated"))
                .emit('authenticate', { token })
                .on('messages', data => {
                    console.log(data)
                    this.setState({ ...this.state, messages: [...this.state.messages, ...data]});
                })
                .on('newMessage', data => {
                    console.log(data)
                    this.setState({ ...this.state, messages: [...this.state.messages, data] });
                })
        });
    }

    writeMessage = (e) => {
        console.log("newmessage")
        e.preventDefault();
        this.state.socket.emit('newMessage', this.state.message);
        this.setState({ ...this.state, message: '' })
    }

    onChange = (e) => {
        this.setState({ ...this.state, message: e.target.value });
    }

    render() {
        setTimeout(() => {
            if (!(this.props.user && this.props.user.token)) {
                return (
                    <Redirect to="/auth" />
                );
            }
        })

        return (
            <div>
                <div className={classes.ChatContainer}>
                    {this.state.messages.map(item => (
                        <div key={item.id} className={classes.ChatItem}>
                            <div className={classes.Author}>{item.type === 'user_message' && `${item.user?.firstName} ${item.user?.lastName}:`} </div>
                            <div className={classes.Message}>{item.text}</div>
                            <div className={classes.Date}>At {new Date(item.createdAt).toLocaleTimeString()}</div>
                        </div>
                    ))}
                </div>
                <form className={classes.SendMessage}
                        onSubmit={this.writeMessage}>
                    <input
                        className={classes.SendInput}
                        placeholder="Write something"
                        value={this.state.message}
                        onChange={(e) => this.onChange(e)}
                    />

                    <Button type="submit"
                        className={classes.SendButton}>
                        Send
                    </Button>
                </form>
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
        updateChat: (payload) => dispatch(updateChat(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);