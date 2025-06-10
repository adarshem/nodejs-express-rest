const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// In-memory storage for users (temporary solution)
const users = [];

function createUser(userData) {
    const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        password: userData.password, // In a real app, this should be hashed
        createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
}

function findByEmail(email) {
    return users.find(user => user.email === email);
}

function findById(id) {
    return users.find(user => user.id === id);
}

export {
    createUser,
    findByEmail,
    findById
};

 