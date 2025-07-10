const express = require('express');
const checkAuth = require('../middlewares/auth.middleware.js');
const { createProject, getProjects, deleteProject } = require('../controllers/project.controller.js');
const router = express.Router();

router.post('/create',checkAuth,createProject);
router.get('/getProjects',checkAuth,getProjects);
router.delete('/deleteProject',checkAuth,deleteProject);

module.exports = router;