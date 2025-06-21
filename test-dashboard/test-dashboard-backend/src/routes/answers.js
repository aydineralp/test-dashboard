 const express = require('express');
const router = express.Router();
const { submitAnswers, getResults, getDetailedResults  } = require('../controllers/answerController');

// Test çözüm cevapları
router.post('/', submitAnswers);

router.get('/results', getResults);

router.get('/detail', getDetailedResults);


module.exports = router;

