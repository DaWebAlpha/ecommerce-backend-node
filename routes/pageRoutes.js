// routes/pageRoutes.js
import express from 'express';
import { ensureAdmin, ensureUser } from '../middleware/authmiddleware.js';

const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Register page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Logout page
router.get('/logout', (req, res) => {
  res.render('logout', { title: 'Logout' });
});

// Secret page - protected
router.get('/secret', ensureUser(), (req, res) => {
  res.render('secret', {
    title: 'Secret',
    username: req.user.username,
  });
});

/*ADMIN LANDING PAGE */
router.get('/admin/home', ensureAdmin(), (req, res) =>{
  res.render('admin/home',{
    title:'Admin Page',
    username: req.user.username,
  })
})

router.get('/admin/registeredUser', ensureAdmin(), (req, res) =>{
  res.render('admin/registeredUser', {
    title: "All users",
    username: req.user.username
  })
})
export default router;
