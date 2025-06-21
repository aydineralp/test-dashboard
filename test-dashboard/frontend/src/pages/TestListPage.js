import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserRole } from '../utils/auth';
import Layout from '../components/Layout';



const TestListPage = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState('');
console.log('KULLANICI ROLE:', getUserRole());

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tests`);
        setTests(res.data);
      } catch (err) {
        setError('Test listesi alınamadı.');
      }
    };

    fetchTests();
  }, []);

  return (
    <Layout>
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Test Listesi</h2>
      {getUserRole() === 'admin' && (
  <div style={{ textAlign: 'right', marginBottom: 10 }}>
    <button onClick={() => window.location.href = '/admin/create-test'}>
      + Yeni Test Oluştur
    </button>
  </div>
)}



<p style={{ textAlign: 'right' }}>
  <button onClick={() => window.location.href = '/results'}>Sonuçlarım</button>
</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tests.map((test) => (
        <div className='card' key={test.id}>
          {getUserRole() === 'admin' && (
  <button
    style={{ backgroundColor: 'red', color: 'white', marginTop: 5 }}
    onClick={async () => {
      const confirm = window.confirm('Bu testi silmek istediğine emin misin?');
      if (!confirm) return;

      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/tests/${test.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Test silindi');
        window.location.reload(); // listeyi yenile
      } catch (err) {
        alert('Silme işlemi başarısız');
        console.error(err.message);
      }
    }}
  >
    Sil
  </button>
)}
          <h4>{test.title}</h4>
          <p>{test.description}</p>
          <a href={`/tests/${test.id}`}>Testi Çöz</a>
        </div>
      ))}
    </div>
    </Layout>
  );
};

export default TestListPage;
