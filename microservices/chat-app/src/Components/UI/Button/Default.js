import React from 'react';
import classes from './Button.module.css'


const Default = (props) => (
    <button onClick={props.clicked} className={[classes.BtnDefault, props.className].join(" ")} style={props.style}>{props.children}</button>
);

export default Default;