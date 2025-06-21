import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; 


const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/answers/results`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResults(res.data.results);
      } catch (err) {
        console.error(err);
        setError('Sonuçlar alınamadı.');
      }
    };

    fetchResults();
  }, []);

  return (
    
    <Layout>
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Test Çözüm Geçmişi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results.length === 0 ? (
        <p>Henüz çözülmüş test yok.</p>
      ) : (
        results.map((r, index) => (
          <div key={index} className='card'>
            <h4>{r.test_title}</h4>
            <p><strong>Toplam Cevap:</strong> {r.total_answered}</p>
            <p><strong>Doğru Sayısı:</strong> {r.correct_count}</p>
            <p><strong>Tarih:</strong> {new Date(r.last_answered).toLocaleString()}</p>
          </div>
        ))
      )}
      <p style={{ textAlign: 'right' }}>
  <a href="/results/detail">🔍 Detaylı Sonuçları Gör</a>
</p>

    </div>
    </Layout>
  );
};

export default ResultsPage;
