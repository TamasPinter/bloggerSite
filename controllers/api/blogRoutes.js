const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateBlog = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId,
            }
        });
        if (updateBlog > 0) {
            res.status(200).json(updateBlog);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });
        if (!blogData) {
            res.status(404).json({ message: 'No blog found' });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;