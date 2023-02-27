const withAuth = require('../utils/auth');
const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
    try {
        let blog = await Blog.findAll({
            include: [User],
        })

        blog = blog.map(blog => blog.get({ plain: true }));
        
        res.render('homepage', {
            blog,
            logged_in: req.session.logged_in, 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});