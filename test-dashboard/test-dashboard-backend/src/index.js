 const express = require('express');

const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // PostgreSQL bağlantısı için gerekli ayarlar

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

 const authRoutes = require('./routes/auth');
 app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Test Dashboard API çalışıyor 🚀');
});

const testRoutes = require('./routes/tests');
app.use('/api/tests', testRoutes);

const answerRoutes = require('./routes/answers');
app.use('/api/answers', answerRoutes);


app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});



