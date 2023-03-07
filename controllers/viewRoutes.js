const withAuth = require('../utils/auth');
const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
    try {
        let blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dash');
        return;
    }
    res.render('login');
});

router.get('/dash', withAuth, async (req, res) => {
    try {
        let userData = await Blog.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{ model: Blog }],
        });
            const user = userData.get({ plain: true });
            res.render('dash', {
                ...user,
                logged_in: true, 
            });
        } catch (err) {
            res.status(500).json(err);
        }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: [ 'id', 'content', 'date_created', 'user_id', 'blog_id',],
                    include: { model: User },
                }
            ],
        });
        const blog = blogData.get({ plain:true });
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dash/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'user_id', 'blog_id', 'date_created'],
                    include: { model: User },
                },
            ],
        });
        const blog = blogData.get({ plain: true });
        res.render('dash-edit', {
            ...blog,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;