import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../utils/tokenBlacklist.js'; 
import dotenv from 'dotenv'
dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

// ✅ Middleware: Allow only admin
export function ensureAdmin() {
  return function (req, res, next) {
    console.log('→ ensureAdmin triggered');
    console.log('  token cookie:', req.cookies?.token);

    const token = req.cookies?.token;
    if (!token || isTokenBlacklisted(token)) {
      console.log('  🛑 No token or blacklisted → Unauthorized');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const payload = jwt.verify(token, jwtSecret);
      console.log('  decoded payload:', payload);

      if (payload.role !== 'admin') {
        console.log(`  🛑 Not admin (role=${payload.role}) → Forbidden`);
        return res.status(403).json({ error: 'Forbidden: Admin only' });
      }

      console.log('  ✅ Admin confirmed');
      req.user = payload;
      req.isAdmin = true;
      next();
    } catch (err) {
      console.log('  🛑 JWT verify error:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// ✅ Middleware: Allow any authenticated user
export function ensureUser() {
  return function (req, res, next) {
    const token = req.cookies?.token;
    if (!token || isTokenBlacklisted(token)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const payload = jwt.verify(token, jwtSecret);
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
