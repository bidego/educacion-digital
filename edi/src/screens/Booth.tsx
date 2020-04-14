import React, { useState, useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { TiGroup } from 'react-icons/ti';
import { Btn } from '../components';
import io from 'socket.io-client';

const socket = io.connect('api/');

const Booth = (props:any) => {
  const streamingData = "";
  const [ startCamera, setStartCamera ] = useState(false);
  const d:Document = document;
  const n:Navigator = navigator;
  const w:any = window;
  useEffect(() => {
      var constraints = { audio: false, video: { width: 1280, height: 720 } };
      const video:any = d.querySelector('#video');
      const canvas:any = d.querySelector('#canvas');
      n.mediaDevices.getUserMedia(constraints)
      .then(function(stream){
          console.log(video)
          setStartCamera(true);
          video.srcObject = stream;
          video.onloadedmetadata = function(e:any) {
              video.play();
          };
      })
      .catch(function(err){
          alert('error al acceder a la camara web: '+ err);
      });

      w.playVideo = (function(cb){
        return w.requestAnimationFrame ||
            w.webkitRequestAnimationFrame ||
            w.mozRequestAnimationFrame ||
            w.msRequestAnimationFrame ||
            function (cb:any) {
                w.setTimeout(cb,1000/100);
            }
      })()
  
      function streamVideo(ctx:any, canvas:any, video:any) {
          var outputStream = canvas.toDataURL('image/jpeg', .2)
          ctx.drawImage(video,0,0);
        
          socket.emit('streaming', outputStream);
          w.playVideo(function() {
              streamVideo(ctx,canvas,video)
          });
      }
  
      w.addEventListener('load', function() {
          video.autoplay = true;
          video.style.display = 'none';
          console.log("CARGADO!")
          streamVideo(canvas.getContext('2d'), canvas, video)
      })
    }, [startCamera])
    
    return(
        <header className="App-header">
            <h1>Hidden Booth</h1>
            <video id="video"></video>
            <canvas id="canvas" width="1280" height="720"></canvas>
        </header>
    )
}

export default Booth;