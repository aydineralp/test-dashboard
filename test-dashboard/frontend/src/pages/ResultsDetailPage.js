import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const ResultsDetailPage = () => {
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/answers/detail`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnswers(res.data.answers);
      } catch (err) {
        console.error(err);
        setError('Detaylı sonuçlar alınamadı.');
      }
    };

    fetchDetails();
  }, []);

  return (
    <Layout>
      <h2>Detaylı Test Sonuçları</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {answers.length === 0 ? (
        <p>Henüz çözülmüş test yok.</p>
      ) : (
        answers.map((item, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #ccc',
              marginBottom: 10,
              padding: 10,
              backgroundColor: item.is_correct === true ? '#e6ffe6' :
                               item.is_correct === false ? '#ffe6e6' : '#f0f0f0'
            }}
          >
            <h4>{item.test_title}</h4>
            <p><strong>Soru:</strong> {item.question_text}</p>
            <p><strong>Verdiğin Cevap:</strong> {item.answer}</p>
            {item.question_type === 'multiple' && (
              <p><strong>Doğru Cevap:</strong> {item.correct_answer}</p>
            )}
            <p>
              <strong>Durum:</strong>{' '}
              {item.is_correct === true
                ? ' Doğru'
                : item.is_correct === false
                ? ' Yanlış'
                : ' Değerlendirme yok'}
            </p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>
              Çözüm Zamanı: {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </Layout>
  );
};

export default ResultsDetailPage;
