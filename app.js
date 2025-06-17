// Filename: App.js
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/userModels.js';   // your custom schema
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ——— View engine setup ———
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ——— Middleware ———
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'Rusty is a dog',      // change to an env var in prod
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }      // secure:true if you use HTTPS
}));

// ——— Simple “isLoggedIn” guard ———
function isLoggedIn(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

// ——— Routes ———

// Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Secret page (protected)
app.get('/secret', isLoggedIn, (req, res) => {
  res.render('secret', { username: req.session.username });
});

// Show registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration
app.post('/register', authLimiter, autoCatchFn(async (req, res) => {
  const { username, password, email } = req.body || {};

  if (!username || !password || !email) {
    return res.status(400).render('register', { error: 'All fields are required.' });
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    return res.status(400).render('register', {
      error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.'
    });
  }

  try {
    await createUser({ username, password, email });
    console.log('✅ User registered successfully');
    return res.redirect('/login');
  } catch (err) {
    let message = 'Registration failed.';
    if (err.message.includes('username')) {
      message = 'That username is already taken. Please choose another.';
    } else if (err.message.includes('email')) {
      message = 'That email is already registered.';
    }

    return res.status(400).render('register', { error: message });
  }
}));


// Show login form
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/login');
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.redirect('/login');
    }

    // Success → establish session
    req.session.userId = user._id;
    req.session.username = user.username;

    res.redirect('/secret');
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

// Handle logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

// ——— Start server ———
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
