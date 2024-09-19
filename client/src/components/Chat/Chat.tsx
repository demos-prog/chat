import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Message, SOCKET_URI } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { transformDate } from '../../helpers/transformDate';
import sendIcon from '../../assets/send-icon.png';
import css from './Chat.module.css';

const socket = io(SOCKET_URI);

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const navigate = useNavigate();
  const userName = sessionStorage.getItem('userName');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (input !== '') {
      socket.emit('message', { author: userName, message: input });
      setInput('');
    }
  };

  return (
    <div id={css.container}>
      <div>
        <div id={css.header}>
          <h1>Chat</h1>
          <span>Welcome, {userName}</span>
        </div>

        {messages.length > 0 ? (
          <div id={css.messages}>
            {messages.map((msg, index) => (
              msg.author === userName ? (
                <div key={index} className={css.ownMessage}>
                  <div className={css.ownMsgHeader}>
                    <span>{msg.message}</span>
                    <span className={css.date}>{transformDate(msg.createdAt)}</span>
                  </div>
                </div>
              ) : (
                <div key={index} className={css.message}>
                  <div className={css.msgHeader}>
                    {msg.author}
                    <div className={css.date}>{transformDate(msg.createdAt)}</div>
                  </div>
                  <p>{msg.message}</p>
                </div>
              )
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className={css.noMsg}>There is no any messages yet.</div>
        )}
      </div>

      <div id={css.inputField}>
        <form id={css.form} onSubmit={sendMessage}>
          <input
            id={css.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
          />
        </form>
        <img
          id={css.sendIcon}
          src={sendIcon}
          alt="send"
          onClick={sendMessage}
        />
      </div>
    </div >
  );
};

export default Chat;