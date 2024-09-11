import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Message, SOCKET_URI } from '../../constants';

const socket = io(SOCKET_URI);

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('allMessages', (data) => {
      setMessages(data);
    });

    return () => {
      socket.off('message');
      socket.off('allMessages');
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      socket.emit('message', { author: 'User1', message: input });
      setInput('');
    }
  };

  return (
    <div>
      <div id="messages" style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.author}: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;