import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';



const TestSolvePage = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tests/${id}`);
        setTest(res.data.data);
      } catch (err) {
        console.error('Test alınamadı:', err.message);
      }
    };
    fetchTest();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Giriş yapılmamış');

    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      question_id: parseInt(questionId),
      answer: answer
    }));

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/answers`,
        { answers: formattedAnswers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Cevaplar başarıyla gönderildi!');
    } catch (err) {
      setMessage('Gönderme başarısız.');
      console.error(err.message);
    }
  };

  if (!test) {
  return (
    <div style={{ padding: 20 }}>
      <p>Test yüklenemedi veya bulunamadı.</p>
    </div>
  );
}


  return (
  <Layout>
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>{test.title}</h2>
      <p>{test.description}</p>

      {test.questions && test.questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p><strong>{q.question_text}</strong></p>

          {q.question_type === 'multiple' ? (
            <div>
              {q.options.map((opt, idx) => (
 <label
  key={idx}
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    fontWeight: 400,
    cursor: 'pointer',
    lineHeight: '1.5',
    minHeight: 32
  }}
>
  <input
    type="radio"
    name={`q_${q.id}`}
    value={opt}
    checked={answers[q.id] === opt}
    onChange={(e) => handleChange(q.id, e.target.value)}
    style={{
      marginRight: 10,
      verticalAlign: 'middle',
      accentColor: '#6366f1',
      width: 18,
      height: 18
    }}
  />
  <span style={{ verticalAlign: 'middle' }}>{opt}</span>
</label>
))}
            </div>
          ) : (
            <textarea
              placeholder="Cevabınızı yazın..."
              rows="3"
              style={{ width: '100%' }}
              value={answers[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Cevapları Gönder</button>
      {message && <p>{message}</p>}
      
    </div>
  </Layout>
  );
};

export default TestSolvePage;
