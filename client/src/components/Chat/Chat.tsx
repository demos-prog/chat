import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Message, SOCKET_URI } from '../../constants';
import { useNavigate } from 'react-router-dom';
import css from './Chat.module.css';
import { transformDate } from '../../helpers/transformDate';

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


  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (input) {
      socket.emit('message', { author: userName, message: input });
      setInput('');
    }
  };

  return (
    <div>
      <div id={css.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={css.message}>
            <div>{msg.author}</div> 
            <p>{msg.message}</p>
            <span>{transformDate(msg.createdAt)}</span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button>Send</button>
      </form>
      <span>{userName}</span>
    </div>
  );
};

export default Chat;