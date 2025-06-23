// نموذج الاتصال بقاعدة البيانات (SQLite)
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('فشل الاتصال بقاعدة البيانات:', err.message);
  }
});

export default db;
