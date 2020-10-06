const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/login', (req, res) => {
	authController.login(req, res).then(response => {
		res.status(200).json(response);
	}).catch(error => {
		res.status(500).json({
			message: e.message
		});
	});
});

router.get('/validate-token', (req, res) => {
	authController.validateToken(req, res).then(response => {
		res.status(200).json(response);
	}).catch(error => {
		res.status(500).json({
			message: error.message
		});
	});
});

router.get('/clear-db', (req, res) => {
	authController.clearDB(req, res).then(response => {
		res.status(200).json(response);
	}).catch(error => {
		res.status(500).json({
			message: e.message
		});
	});
});

module.exports = router;