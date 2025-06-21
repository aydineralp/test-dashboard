import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import Layout from '../components/Layout'; 

const AdminTestCreatePage = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  // Admin değilse yönlendir
  useEffect(() => {
    if (role !== 'admin') {
      navigate('/tests');
    }
  }, [role, navigate]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        question_type: 'open',
        options: [],
        correct_answer: ''
      }
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updated = [...questions];
    updated[index].options[optionIndex] = value;
    setQuestions(updated);
  };

  const addOption = (index) => {
    const updated = [...questions];
    updated[index].options.push('');
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/tests`,
        { title, description, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(' Test başarıyla oluşturuldu!');
      navigate('/tests');
    } catch (err) {
      console.error('Oluşturma hatası:', err.message);
      alert(' Test oluşturulamadı.');
    }
  };

  if (role !== 'admin') return null;

  return (
    <Layout>
      <h2>Yeni Test Oluştur</h2>

      <input
        type="text"
        placeholder="Test Başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <textarea
        placeholder="Test Açıklaması"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        style={{ width: '100%', marginBottom: 20 }}
      />

      <button onClick={addQuestion}>+ Soru Ekle</button>

      {questions.map((q, index) => (
        <div key={index} style={{ marginTop: 20, borderTop: '1px solid #ccc', paddingTop: 10 }}>
          <p><strong>Soru {index + 1}</strong></p>
          <textarea
            placeholder="Soru metni"
            value={q.question_text}
            onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />

          <select
            value={q.question_type}
            onChange={(e) => handleQuestionChange(index, 'question_type', e.target.value)}
          >
            <option value="open">Açık Uçlu</option>
            <option value="multiple">Çoktan Seçmeli</option>
          </select>

          {q.question_type === 'multiple' && (
            <div>
              <button type="button" onClick={() => addOption(index)} style={{ marginTop: 5 }}>
                Şık Ekle
              </button>
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Şık ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, i, e.target.value)}
                  style={{ display: 'block', marginBottom: 5 }}
                />
              ))}
              <input
                type="text"
                placeholder="Doğru Şık"
                value={q.correct_answer}
                onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                style={{ marginTop: 5 }}
              />
            </div>
          )}
        </div>
      ))}

      <button style={{ marginTop: 20 }} onClick={handleSubmit}>
        ✅ Testi Kaydet
      </button>
    </Layout>
  );
};

export default AdminTestCreatePage;
