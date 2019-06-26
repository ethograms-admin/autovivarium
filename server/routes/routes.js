var express = require('express');
var router = express.Router();

var logsController = require('../controllers/logsController');
var conclusionsController = require('../controllers/conclusionsController');
var framesController = require('../controllers/framesController');

router.get('/api/logs', logsController.get);
router.post('/api/logs/post', logsController.post);

router.get('/api/conclusions', conclusionsController.get);
router.post('/api/conclusions/post', conclusionsController.post);

router.get('/api/frames', framesController.get);
router.post('/api/frames/post', framesController.post);

module.exports = router;