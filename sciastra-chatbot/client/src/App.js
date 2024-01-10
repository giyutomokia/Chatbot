// client/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('/api/chat', { message: input });
      const { latestMessage } = response.data; // Update the response structure accordingly

      setMessages([...messages,userMessage, latestMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>SciAstra Chatbot</h1>
      </header>
      <Chatbot />
    </div>
  );
}

export default App;
