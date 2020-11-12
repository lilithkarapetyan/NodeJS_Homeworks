import React, { Component } from 'react';
import classes from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        value: ""
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value 
        }, () => this.props.onSearch(this.state.value))
    }
    render() {
        return (
            <input
                className={classes.SearchInput}
                placeholder="Search something"
                value={this.state.value}
                onChange={(e) => this.onChange(e)}
            />
        );
    }
}

export default Searchbar;