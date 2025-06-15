import jwt from 'jsonwebtoken';

// JWT secret key - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Creates a JWT token for a user
 * @param {Object} payload - The data to be encoded in the token
 * @param {string} [expiresIn='1h'] - Token expiration time
 * @returns {string} JWT token
 */
export const createToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verifies a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

/**
 * Middleware to protect routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};
