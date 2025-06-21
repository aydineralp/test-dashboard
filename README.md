# 🧪 Test Dashboard Uygulaması

Bu proje, kullanıcıların test çözebileceği ve admin kullanıcıların test oluşturabileceği bir fullstack web uygulamasıdır.

---

## 🚀 Özellikler

- Kullanıcı kayıt ve giriş (JWT ile kimlik doğrulama)
- Rol bazlı yetkilendirme (user / admin)
- Admin:
  - Test oluşturma (açık uçlu / şıklı)
  - Test silme
- Kullanıcı:
  - Test çözme
  - Cevapları gönderme
  - Sonuçları ve detayları görüntüleme
- Basit ve anlaşılır kullanıcı arayüzü

---

## 🛠️ Teknolojiler

| Katman     | Teknoloji                      |
|------------|-------------------------------|
| Frontend   | React, Axios, React Router    |
| Backend    | Node.js, Express              |
| Veritabanı | PostgreSQL                    |
| Diğer      | JWT, bcrypt, dotenv           |

---

## 🗂️ Klasör Yapısı

test-dashboard/
├── backend/ # Express API
├── frontend/ # React arayüz
└── README.md

## 🔧 Kurulum

### 1. Veritabanı bağlantısını ayarla

`backend/.env` dosyası:
PORT=5000 
DATABASE_URL=postgresql://postgres:123456@localhost:5432/test_dashboard
JWT_SECRET=çokgizlibirsecret

### 2. Backend başlat


cd backend
npm install
npm run dev

### 3. Frontend başlat
frontend/.env dosyası:

REACT_APP_API_URL=http://localhost:5000/api

cd frontend
npm install
npm start

👤 Kullanıcı Rolleri
admin: Test oluşturabilir ve silebilir

user: Sadece test çözebilir, sonuçlarını görebilir

İlk admin kullanıcı veritabanına doğrudan eklenmiştir. karadag@example.com   , 123456 (is_admin = true).
