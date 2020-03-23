import React from 'react';
import { Button } from 'react-bootstrap';

const Btn = (props:any) => {
    return (
        <Button style={props.styles} {...props}>{props.children}</Button>
    )
}

export default Btn;