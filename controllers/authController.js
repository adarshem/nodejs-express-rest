import User from '../models/User.js';

function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const result = User.create({ username, email, password });
        const newUser = User.findById(result.lastInsertRowid);

        // Return success response (excluding password)
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({
            message: 'User created successfully',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return success response (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
}

export {
    signup,
    login
}; 