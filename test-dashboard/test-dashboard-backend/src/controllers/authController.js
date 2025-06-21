 const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

// Kullanıcı kaydı
const register = async (req, res) => {
const { name, email, password, role = 'user' } = req.body;

  try {
    // E-posta daha önce alınmış mı?
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı' });
    }

    // Parolayı hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
const newUser = await userModel.createUser(name, email, hashedPassword, role);

    // JWT token üret
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Kayıt Hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

// Kullanıcı girişi
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    console.error('Giriş Hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

module.exports = {
  register,
  login,
};

