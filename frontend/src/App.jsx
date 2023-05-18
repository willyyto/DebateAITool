import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

function App() {
  const [chatGptResponse, setChatGptResponse] = useState(null);
  const [bardResponse, setBardResponse] = useState(null);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    // Connect to the server
    socket.connect();

    // Listen for a chatGptResponse from the server
    socket.on('chatgptResponse', (response) => {
      console.log('ChatGPT Response from server:', response);
      setChatGptResponse(response);
    });

    // Listen for a bardResponse from the server
    socket.on('bardResponse', (response) => {
      console.log('Bard Response from server:', response);
      setBardResponse(response);
    });

    // Disconnect the socket when the component unmounts
    return () => socket.disconnect();
  }, []);

  // Function to emit 'chatgpt' event
  const sendChatGpt = (argument) => {
    socket.emit('chatgpt', argument);
  };

  // Function to emit 'bard' event
  const sendBard = (argument) => {
    socket.emit('bard', argument);
  };

  // Function to emit 'bard' event
  const sendDebate = (argument) => {
    socket.emit('debate', argument);
  };

  return (
    <div>
      <h1>ChatGPT Response from server: {chatGptResponse}</h1>
      <h1>Bard Response from server: {bardResponse}</h1>
      <button onClick={() => sendDebate('how to solve world starvation')}>Send Debate Message</button>
    </div>
  );
}

export default App;
