import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        { name, email, password }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/tests');
    } catch (err) {
      setError(err.response?.data?.message || 'Kayıt başarısız');
    }
  };

  return (
   
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Adınız"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10 }}
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: 10 }}
        />
        <button type="submit">Kayıt Ol</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
  Hesabınız var mı? <a href="/login">Giriş Yap</a>
</p>
    </div>
    
  );
};

export default RegisterPage;
