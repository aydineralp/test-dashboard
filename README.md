# 🧪 Test Dashboard Uygulaması

Bu proje, kullanıcıların test çözebileceği ve admin kullanıcıların test oluşturabileceği bir fullstack web uygulamasıdır.

---

## 🚀 Özellikler

- Kullanıcı kayıt ve giriş (JWT ile kimlik doğrulama)
- Rol bazlı yetkilendirme (user / admin)

### 👤 Admin Yetkileri:
- Test oluşturma (açık uçlu / çoktan seçmeli)
- Test silme

### 👤 Kullanıcı Yetkileri:
- Test çözme
- Cevapları gönderme
- Sonuçları ve detayları görüntüleme

> Temiz ve anlaşılır bir kullanıcı arayüzü ile geliştirilmiştir.

---

## 🛠️ Teknolojiler

| Katman     | Teknoloji                     |
|------------|-------------------------------|
| Frontend   | React, Axios, React Router    |
| Backend    | Node.js, Express              |
| Veritabanı | PostgreSQL                    |
| Diğer      | JWT, bcrypt, dotenv           |

---

## 🗂️ Klasör Yapısı
test-dashboard/
├── backend/ # Express API (Node.js)
│ └── database/ # SQL yedeği burada
├── frontend/ # React arayüz
└── README.md


---

## 🔧 Kurulum

### 1. Veritabanı Ayarları

`backend/.env` dosyası:

PORT=5000
DATABASE_URL=postgresql://postgres:123456@localhost:5432/test_dashboard
JWT_SECRET=çokgizlibirsecret

> `123456` PostgreSQL şifresidir. Gerekirse kendi sisteminize göre güncelleyin.

---

### 2. Veritabanını Kurmak

SQL yedeğiyle veritabanını doğrudan yükleyebilirsiniz:

#### ➤ Adımlar:

1. PostgreSQL yüklü değilse kurun
2. Komut satırında şu komutları girin:


createdb -U postgres test_dashboard
psql -U postgres -d test_dashboard -f backend/database/test_dashboard.sql

postgres: PostgreSQL kullanıcı adınız

123456: PostgreSQL şifreniz

test_dashboard.sql: İçinde tüm tablolar ve örnek veriler hazırdır

3. Backend Başlat
cd backend
npm install
npm run dev

4. Frontend Başlat
REACT_APP_API_URL=http://localhost:5000/api

cd frontend
npm install
npm start


👤 Hazır Admin Kullanıcı
Veritabanına önceden eklenmiş admin kullanıcı bilgileri:

📧 E-posta: karadag@example.com

🔑 Şifre: 123456

🎓 Rol: Admin (is_admin = true)
