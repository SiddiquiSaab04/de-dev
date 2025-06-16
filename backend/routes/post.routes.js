const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Route to create a new user
router.post('/create',authenticateToken,authorizeRoles("admin"), postController.createPost);
router.put('/update/:id',authenticateToken,authorizeRoles("admin"),postController.updatePost);
router.get('/getPosts',postController.getPost)
router.delete('/delete/:id',authenticateToken,authorizeRoles("admin"),postController.deletePost);
module.exports = router;