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

router.get('/dash', withAuth, async (req, res) => {
    try {
        let blogs = await Blog.findAll({
            include: [User],
            where: {
                userId: req.session.user_id
            }
        })

        let sequelizeBlogs = blogs.map((blog) => {
            return {
                ...blog.get({ plain: true }),
                belongsToUser: req.session.user_id === blog.userId
            }
        });

        res.render('dash', { blogs: sequelizeBlogs, logged_in: req.session.logged_in, username: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id)
        const vName = req.session.logged_in ? 'editBlog' : 'post';

        res.render(vName, {
            data: log.dataValues,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;