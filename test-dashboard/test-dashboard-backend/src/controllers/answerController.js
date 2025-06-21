 const jwt = require('jsonwebtoken');
const answerModel = require('../models/answerModel');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

const submitAnswers = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token gerekli' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const { answers } = req.body;

    const savedAnswers = [];

    for (const ans of answers) {
      const questionRes = await db.query('SELECT question_type, correct_answer FROM questions WHERE id = $1', [ans.question_id]);
      const question = questionRes.rows[0];

      let isCorrect = null;
      if (question.question_type === 'multiple') {
        isCorrect = ans.answer === question.correct_answer;
      }

      const saved = await answerModel.saveAnswer(userId, ans.question_id, ans.answer, isCorrect);
      savedAnswers.push(saved);
    }

    res.status(201).json({ message: 'Cevaplar kaydedildi', answers: savedAnswers });
  } catch (error) {
    console.error('Cevap gönderme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const getResults = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token gerekli' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const results = await answerModel.getUserResults(userId);
    res.json({ results });
  } catch (error) {
    console.error('Geçmiş getirilemedi:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const getDetailedResults = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token gerekli' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const answers = await answerModel.getDetailedAnswers(userId);
    res.json({ answers });
  } catch (error) {
    console.error('Detaylı sonuç hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};


module.exports = {
  submitAnswers,
  getResults,
  getDetailedResults,
};

