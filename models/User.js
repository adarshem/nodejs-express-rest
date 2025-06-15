import db from '../config/db/database.js';

class User {
    static create({ username, email, password }) {
        const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
        return stmt.run(username, email, password);
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

    static update(id, { username, email, password }) {
        const stmt = db.prepare('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?');
        return stmt.run(username, email, password, id);
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        return stmt.run(id);
    }
}

export default User;

 