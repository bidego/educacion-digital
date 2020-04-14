import React, { useEffect, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { TiGroup } from 'react-icons/ti';
import { Btn } from '../components';
import io from 'socket.io-client';

const socket = io.connect('api/');

const Rooms = (props:any) => {
    const [ imageData, setImageData ] = useState("");

    useEffect(() => {
        console.log("montado")
        socket.on('play stream', function(image:any) {
            setImageData(image);
        });
    }, [imageData]);

    return(
        <header className="App-header">
            <h1>Rooms</h1>
            <img src={imageData} alt="streaming" />
        </header>
    )
}

export default Rooms;