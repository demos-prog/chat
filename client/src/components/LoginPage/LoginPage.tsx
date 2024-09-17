import React, { useState } from 'react';
import css from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom';


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
        <input
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