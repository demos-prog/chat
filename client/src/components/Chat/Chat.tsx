import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Message, SOCKET_URI } from '../../constants';
import { useNavigate } from 'react-router-dom';
import css from './Chat.module.css';

const socket = io(SOCKET_URI);

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const navigate = useNavigate()
  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    if (!userName) navigate('/')
    socket.emit('requestAllMessages');

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
  }, [navigate, userName]);

  const sendMessage = () => {
    if (input) {
      socket.emit('message', { author: userName, message: input });
      setInput('');
    }
  };

  return (
    <div>
      <div id={css.messages}>
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