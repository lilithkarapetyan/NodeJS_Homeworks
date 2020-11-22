import React, { Component } from 'react';
import { connect } from 'react-redux'
import classes from './Chat.module.css';
import { Button } from '@material-ui/core';
import sound from '../../assets/newMessage.ogg';

import { logOut, updateChat } from '../../Store/Actions/AuthActions'
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props)
        this.scrollRef = React.createRef()  
        this.audio = new Audio(sound);
    }

    state = {
        socket: null,
        message: '',
        messages: [],
        activeNow: [],
    };

    componentDidMount() {
        const socket = io('64.227.19.142:3002');
        this.setState({ ...this.state, socket });
        const token = sessionStorage.getItem('token');
        socket.on('connect', () => {
            socket
                .on('authenticated', () => console.log("authenticated"))
                .emit('authenticate', { token })
                .on('messages', data => {
                    console.log(data)
                    this.setState({ ...this.state, messages: [...data] });
                })
                .on('newMessage', data => {
                    this.setState({ ...this.state, messages: [...this.state.messages, data] });
                    
                    this.audio.play();
                })
                .on('onlineUsers', data => {
                    console.log(data)
                    this.setState({ ...this.state, activeNow: [...data] })
                })
        });
        this.scrollRef.current && (this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight);
    }
    componentDidUpdate(){
        this.scrollRef.current && (this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight);
    }

    writeMessage = (e) => {
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
            <>
                <div className={classes.Container}>
                    <div className={classes.ActiveNow}>
                        <b>Active now:</b>
                        {this.state.activeNow.map(item => (
                            <div key={item.id} className={classes.ChatItem}>
                                <div className={classes.Author}><span className={classes.Dot}></span>{`${item?.firstName} ${item?.lastName}`} </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.ChatContainer} ref={this.scrollRef}>
                        {this.state.messages.map(item => (
                            <div key={item.id} className={classes.ChatItem}>
                                <div className={classes.Author}>{item.type === 'user_message' && `${item.user?.firstName} ${item.user?.lastName}:`} </div>
                                <div className={classes.Message}>{item.text}</div>
                                <div className={classes.Date}>At {new Date(item.createdAt).toLocaleTimeString()}</div>
                            </div>
                        ))}
                    </div>

                </div>
                <form className={classes.SendMessage}
                    onSubmit={this.writeMessage}>
                    <div>
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
                    </div>
                </form>
            </>);
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