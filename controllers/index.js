const router = require('express').Router();
const viewRoutes = require('./viewRoutes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', viewRoutes);

module.exports = router;