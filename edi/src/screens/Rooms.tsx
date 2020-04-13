import React, { useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { TiGroup } from 'react-icons/ti';
import { Btn } from '../components';
//import io from 'socket.io-client';

//const socket = io.connect('http://localhost:3001');

const Rooms = (props:any) => {
    const streamingData = "";

    /*
    useEffect(() => {
        function receiveMessage(m) {
          console.log(m)
          if(role === 'server') {
            audio.src = m.path;
            audio.play();
          }
          setPlaying(m.name);
        }
        function stopEvent(m) {
          console.log(m)
          if(role === 'server') {
            audio.pause();
          }
          setPlaying('');
        }
        socket.on('play stream', function(image) {
            streamingData = image;
        });
        return () => {
          socket.off('play', receiveMessage );
          socket.on('stop', stopEvent);
        }
      }, [role, audio]);
    */
    return(
        <header className="App-header">
            <h1>Rooms</h1>
            <img src={streamingData}></img>
        </header>
    )
}

export default Rooms;