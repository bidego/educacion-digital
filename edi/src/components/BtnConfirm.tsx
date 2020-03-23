import React from 'react';
import { Button } from 'react-bootstrap';

const BtnConfirm = (props:any) => {
    return (
        <Button variant="outline-primary" style={props.styles} {...props}>{props.children}</Button>
    )
}

export default BtnConfirm;