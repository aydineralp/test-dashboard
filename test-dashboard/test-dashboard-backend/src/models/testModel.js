const db = require('../config/db');
const { get } = require('../routes/auth');

// Yeni test oluştur
const createTest = async (title, description, userId) => {
  const result = await db.query(
    'INSERT INTO tests (title, description, created_by) VALUES ($1, $2, $3) RETURNING *',
    [title, description, userId]
  );
  return result.rows[0];
};

// Teste soru ekle
const addQuestion = async (testId, question) => {
  const { question_text, question_type, options, correct_answer } = question;

  const result = await db.query(
    `INSERT INTO questions (test_id, question_text, question_type, options, correct_answer)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [testId, question_text, question_type, options, correct_answer]
  );
  return result.rows[0];
};

const getAllTests = async () => {
  const result = await db.query('SELECT * FROM tests ORDER BY created_at DESC');
  return result.rows;
};      

const getTestById = async (testId) => {
    const client = await db.connect();

  try {
    const testResult = await db.query(
      'SELECT id, title, description, created_at, created_by FROM tests WHERE id = $1',
      [testId]
    );

    if (testResult.rows.length === 0) return null;

    const questionResult = await db.query(
      'SELECT id, question_text, question_type, options FROM questions WHERE test_id = $1',
      [testId]
    );

    // Sadece gerekli alanları döndür
    const test = {
      id: testResult.rows[0].id,
      title: testResult.rows[0].title,
      description: testResult.rows[0].description,
      created_at: testResult.rows[0].created_at,
      created_by: testResult.rows[0].created_by,
      questions: questionResult.rows.map(q => ({
        id: q.id,
        question_text: q.question_text,
        question_type: q.question_type,
        options: q.options
      }))
    };

    return test;
  } catch (error) {
    console.error('Test getirme hatası:', error.message);
    throw new Error('Test verileri alınırken bir hata oluştu');
  } finally {
    if (client) {
      client.release();
    }
  }
};


module.exports = {
  createTest,
  addQuestion,
  getAllTests,
  getTestById,
};
