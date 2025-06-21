 const db = require('../config/db');

// Yeni cevap kaydet
const saveAnswer = async (userId, questionId, answer, isCorrect) => {
  const result = await db.query(
    `INSERT INTO answers (user_id, question_id, answer, is_correct)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, questionId, answer, isCorrect]
  );

  return result.rows[0];
};



const getUserResults = async (userId) => {
  const result = await db.query(`
    SELECT
      t.id AS test_id,
      t.title AS test_title,
      COUNT(a.id) AS total_answered,
      COUNT(*) FILTER (WHERE a.is_correct = true) AS correct_count,
      MAX(a.created_at) AS last_answered
    FROM answers a
    JOIN questions q ON a.question_id = q.id
    JOIN tests t ON q.test_id = t.id
    WHERE a.user_id = $1
    GROUP BY t.id, t.title
    ORDER BY last_answered DESC
  `, [userId]);

  return result.rows;
};

const getDetailedAnswers = async (userId) => {
  const result = await db.query(`
    SELECT
      t.title AS test_title,
      q.question_text,
      q.question_type,
      q.correct_answer,
      a.answer,
      a.is_correct,
      a.created_at
    FROM answers a
    JOIN questions q ON a.question_id = q.id
    JOIN tests t ON q.test_id = t.id
    WHERE a.user_id = $1
    ORDER BY a.created_at DESC
  `, [userId]);

  return result.rows;
};


module.exports = {
  saveAnswer,
  getUserResults,
  getDetailedAnswers,
};

