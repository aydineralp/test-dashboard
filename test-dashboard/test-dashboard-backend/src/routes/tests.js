const express = require('express');
const router = express.Router();
const { createTestWithQuestions, getAllTests } = require('../controllers/testController');
const testModel = require('../models/testModel');
const { deleteTest } = require('../controllers/testController');


// Test oluşturma
router.post('/', createTestWithQuestions);

router.get('/', getAllTests);

router.get('/:id', async (req, res) => {
  const testId = req.params.id;

  try {
    const test = await testModel.getTestById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test bulunamadı' });
    }
    
    res.json({
      status: 'success',
      data: test
    });
  } catch (error) {
    console.error('Test detay hatası:', error.message);
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

router.get('/test-connection', async (req, res) => {
  try {
    const client = await pool.connect();
    client.release();
    res.json({ status: 'success', message: 'Veritabanı bağlantısı başarılı' });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Veritabanı bağlantı hatası',
      error: error.message 
    });
  }
});

router.delete('/:id', deleteTest);

module.exports = router;
