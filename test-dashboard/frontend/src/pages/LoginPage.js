import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );

      const token = response.data.token;

      localStorage.setItem('token', token); // Token'ı sakla
      navigate('/tests'); // Başarılıysa test listesine git
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş başarısız');
    }
  };

  return (
    
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Giriş Yap</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
  Hesabınız yok mu? <a href="/register">Kayıt Ol</a>
</p>
    </div>
  );
};



export default LoginPage;
