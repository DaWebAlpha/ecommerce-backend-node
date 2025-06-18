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

/* // Secret page - protected
router.get('/secret', ensureUser(), (req, res) => {
  res.render('secret', {
    title: 'Secret',
    username: req.user.username,
  });
}); */

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

router.delete('/admin/registeredUser', ensureAdmin(), (req, res) =>{
  res.render('admin/registeredUser', {
    title: "delete User",
    username:req.user.username
  })
})


// Principal Superintendent
router.get('/users/ps', ensureUser(), (req, res) => {
  res.render('users/ps/home', {
    title: 'Principal Superintendent Home',
    username: req.user.username
  });
});

// Assistant Director I
router.get('/users/adI', ensureUser(), (req, res) => {
  res.render('users/adI/home', {
    title: 'Assistant Director I Home',
    username: req.user.username
  });
});

// Assistant Director II
router.get('/users/adII', ensureUser(), (req, res) => {
  res.render('users/adII/home', {
    title: 'Assistant Director II Home',
    username: req.user.username
  });
});

// Deputy Director
router.get('/users/dd', ensureUser(), (req, res) => {
  res.render('users/dd/home', {
    title: 'Deputy Director Home',
    username: req.user.username
  });
});

export default router;
