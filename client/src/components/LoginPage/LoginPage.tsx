import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './LoginPage.module.css'


const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (name !== '') {
      sessionStorage.setItem('userName', name)
      setName('')
      navigate('/app')
    }
  }

  return (
    <div className={css.wrap}>
      <form onSubmit={handleSubmit} className={css.formField}>
        <span className={css.note}>Please enter your nickname and enter the chat room</span>
        <input
          placeholder='Enter your nickname'
          required
          type="text"
          name="name"
          id={css.nameField}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input type="submit" value="Enter" />
      </form>
    </div>
  );
};

export default LoginPage;