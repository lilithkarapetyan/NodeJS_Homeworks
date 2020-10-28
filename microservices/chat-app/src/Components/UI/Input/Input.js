import React from 'react';
import classes from './input.module.css';

const Input = (props) => {
    const classNames = [classes.Input, props.classNames || ""].join(" ");

    return (<input
        {...props}
        className={classNames}
        onChange={(event) => props.onChange(event.target.value)}
    />)
}

export default Input;