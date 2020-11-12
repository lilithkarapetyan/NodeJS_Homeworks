import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Form = (props) => {

    const classes = useStyles();

    return (
        <div>
            <div>
                <form className={classes.root}>
                    {
                        props.fields.map(type => {
                            let options = "";
                            if (type.type === "select" && type["options"]) {
                                options = type.options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                    </MenuItem>
                                  ))
                            }
                            else{
                                options = "";
                            }
                            return (
                                <TextField key={type.id}
                                    label={type.title}
                                    required
                                    error={type.validation ? !type.validation(): false}
                                    value={(props.user[type.id] || (props.user[type.id] === 0 ? 0 : ""))}
                                    onChange={(e) => props.onChange(type.id, e.target.value)}
                                    select={type.type === "select"}
                                    type = {type.type}>
                                    {options}
                                </TextField>
                            )
                        })
                    }
                </form>
            </div>
            
        </div>
    )
}
export default Form;