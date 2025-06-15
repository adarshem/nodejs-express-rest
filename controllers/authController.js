import User from '../models/User.js';
import bcrypt from 'bcryptjs';

async function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        // Helper function to check for empty or whitespace-only strings
        function isBlank(str) {
            return !str || typeof str !== 'string' || str.trim().length === 0;
        }

        // Validate email and password presence and format
        if (isBlank(email)) {
            return res.status(400).json({ message: 'Email is required and cannot be blank.' });
        }
        if (isBlank(password)) {
            return res.status(400).json({ message: 'Password is required and cannot be blank.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }

        // Validate password length
        if (password.trim().length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // Check if user already exists
        const existingUser = User.findByEmail(email.trim());
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken.' });
        }

        // Create new user
        const result = await User.create({ username, email: email.trim(), password });
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

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
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