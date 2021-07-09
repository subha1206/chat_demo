import { useEffect, useState } from 'react';
import './App.css';

import { w3cwebsocket as W3CWebSocket } from 'websocket';
// ES6 import or TypeScript
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

function App() {
  const [userId, setUserId] = useState('');
  const [msg, setMsg] = useState([]);
  const [type, setType] = useState('');
  const [room, setRoom] = useState('');

  const user = window.location.search.split('?')[1];

  const socket = new W3CWebSocket('ws://155.254.28.96:8000/ws/onetone/1/');

  // socket.on('connect', () => {
  //   setUserId(socket.id);
  //   console.log(socket.id, 'hello'); // true
  // });

  // socket.on('rec-message', (text) => {
  //   setMsg([...msg, text]);
  // });

  socket.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  const sendMessage = (type) => {
    // socket.send(JSON.stringify({ id: 1, text: type }));
    setMsg([...msg, type]);
    socket.emit('send-msg', type, room);
  };

  const addRoom = () => {
    setRoom((r) => r);
  };
  return (
    <div className='flex justify-between w-screen h-screen'>
      <div className='w-1/5 bg-green-500 px-1'>
        <input
          onChange={(e) => setRoom(e.target.value)}
          className='p-3 rounded w-full mt-2'
        ></input>
        <button
          className=' border border-blue-700 p-1 px-6 text-lg font-medium rounded mt-2 mx-12 text-white'
          onClick={addRoom}
        >
          Add
        </button>
      </div>
      <div className='w-4/5 h-screen' style={{ position: 'relative' }}>
        <div className='w-full bg-gray-200 h-16'>
          <p className='text-xl py-2 px-1'>User : {userId}</p>
        </div>
        <div className='chat-box overflow-auto' style={{ maxHeight: '75vh' }}>
          {msg.map((m) => (
            <div className='clearfix'>
              <div className='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix'>
                {m}
              </div>
            </div>
          ))}

          {/* <div className='clearfix'>
            <div className='bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix'>
              check my twitter to see when it will be released.
            </div>
          </div> */}
        </div>
        <div
          className='chat-input-box bg-green-200 p-2 w-full flex justify-between space-x-12'
          style={{ position: 'absolute', bottom: '0' }}
        >
          <input
            className='p-3 rounded w-full'
            onChange={(e) => setType(e.target.value)}
          ></input>
          <button
            onClick={() => sendMessage(type)}
            className=' border border-blue-700 p-1 px-6 text-lg font-medium rounded'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
