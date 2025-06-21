const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // maksimum bağlantı sayısı
  idleTimeoutMillis: 30000, // boşta bekleyen bağlantıların timeout süresi
  connectionTimeoutMillis: 2000, // bağlantı timeout süresi
  retry: {
    match: [
      /Error: read ECONNRESET/,
      /Error: connect ETIMEDOUT/
    ],
    max: 3 // maksimum yeniden deneme sayısı
  }
});

// Bağlantı hatası dinleyicisi
pool.on('error', (err, client) => {
  console.error('Beklenmeyen veritabanı hatası:', err);
});

// Bağlantı testi
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL bağlantısı başarılı!');
    client.release();
  } catch (err) {
    console.error('PostgreSQL bağlantı hatası:', err);
  }
};

testConnection();

module.exports = pool;