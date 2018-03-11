const express = require('express');
const router = express.Router();

router.use('/', require('./view/home.js'));
// router.use('/article', require('./view/article.js'));
// router.use('/user', require('./view/user.js'));

// router.use('/api/user', require('./api/user.js'));
// router.use('/api/article', require('./api/article.js'));
// router.use('/api/comment', require('./api/comment.js'));

module.exports = router;
