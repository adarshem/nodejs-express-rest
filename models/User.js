import db from '../config/db/database.js';
import bcrypt from 'bcryptjs';

class User {
    static async create({ username, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
        return stmt.run(username, email, hashedPassword);
    }

    static findAll() {
        const stmt = db.prepare('SELECT id, username, email, created_at FROM users');
        return stmt.all();
    }

    static findById(id) {
        const stmt = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?');
        return stmt.get(id);
    }

    static findByEmail(email) {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        return stmt.get(email);
    }

    static async update(id, { username, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?');
        return stmt.run(username, email, hashedPassword, id);
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        return stmt.run(id);
    }
}

export default User;

 