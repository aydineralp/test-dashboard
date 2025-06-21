const testModel = require('../models/testModel');
const jwt = require('jsonwebtoken');
const db = require('../config/db');


const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

// Test ve soruları oluştur
const createTestWithQuestions = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token bulunamadı' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Token çözülüyor
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const { title, description, questions } = req.body;

    // 1. Testi oluştur
    const newTest = await testModel.createTest(title, description, userId);

    // 2. Soruları oluştur
    const createdQuestions = [];

    for (const q of questions) {
      const question = await testModel.addQuestion(newTest.id, q);
      createdQuestions.push(question);
    }

    res.status(201).json({
      test: newTest,
      questions: createdQuestions,
    });
  } catch (error) {
console.error('Test oluşturma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await testModel.getAllTests();
    res.json(tests);
  } catch (error) {
    console.error('Test listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const getTestById = async (req, res) => {
  const testId = req.params.id;

  try {
    const test = await testModel.getTestById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test bulunamadı' });
    }

    res.json(test);
  } catch (error) {
    console.error('Test detay hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const deleteTest = async (req, res) => {
  const testId = req.params.id;

  try {
    // 1. test_id'ye bağlı question_id'leri al
    const questionIdsResult = await db.query(
      'SELECT id FROM questions WHERE test_id = $1',
      [testId]
    );

    const questionIds = questionIdsResult.rows.map(row => row.id);

    // 2. o question_id'lere bağlı tüm cevapları sil
    for (const qid of questionIds) {
      await db.query('DELETE FROM answers WHERE question_id = $1', [qid]);
    }

    // 3. sonra soruları sil
    await db.query('DELETE FROM questions WHERE test_id = $1', [testId]);

    // 4. en son testi sil
    await db.query('DELETE FROM tests WHERE id = $1', [testId]);

    res.json({ message: 'Test ve ilişkili veriler silindi' });
  } catch (error) {
    console.error('Test silme hatası:', error.message);
    res.status(500).json({ message: 'Test silinemedi' });
  }
};



module.exports = {
  createTestWithQuestions,
  getAllTests,
  getTestById,
  deleteTest,
};
