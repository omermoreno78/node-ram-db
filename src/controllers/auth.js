const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const db = require('../db').db;
const jwtSecret = "56965a8b47cf53b93f7a5c93aaba64cfa33c27bb6568743413aa8cca7df06a7c";

let authController = {};

/**
 * This is a basic login method without validation of the username or password is just for test.
 */
authController.login = (req, res) => {
	return new Promise((resolve, reject) => {
		console.log("-- (Controller) authController.login() - req.body: ", req.body);

		const extToken = authController.extLogin(req.body.username, req.body.password).then(extToken => {
			console.log("-- (Controller) authController.login() - extToken: ", extToken);

			const token = jwt.sign({
				username: req.body.username
			}, jwtSecret);

			console.log("-- (Controller) authController.login() - token: ", token);

			db.insertOne({
				token,
				extToken,
				username: req.body.username
			}, function (err, doc) {
				console.log("-- (Controller) authController.login() - doc: ", doc);

				resolve({
					token,
					username: req.body.username
				});
			});
		}).catch(reject);
	});
};

/**
 * This method is to do login with an external service / API, this is an example just for test, you need add the business logic.
 */
authController.extLogin = (username, password) => {
	return new Promise((resolve, reject) => {
		let extToken = "";

		// #region Test code.

		// Call here the method to login with an external service...

		// Generate a dummy token:
		extToken = jwt.sign({
			username
		}, "5e9326932884d71d9a2196f0d5171698");
		// #endregion Test code.

		resolve(extToken);
	});
};

/**
 * This method check if the token exist, you need add your business logic, this is just a test. 
 */
authController.validateToken = (req, res) => {
	return new Promise((resolve, reject) => {
		console.log("-- (Controller) authController.validateToken() - req.body: ", req.body);

		let token = req.headers.authorization.split(' ');
		token = token ? token[1] : null;

		const decoded = jwt.verify(token, jwtSecret);

		console.log("-- (Controller) authController.validateToken() - decoded: ", decoded);

		db.find({
			token
		}).toArray(function (err, docs) {
			console.log("-- (Controller) authController.validateToken() - docs: ", docs);

			if (Array.isArray(docs) && docs.length > 0) {
				resolve({
					success: true
				});
			} else {
				reject(new Error('Invalid Token!'));
			}
		});
	});
};

/**
 * This method is for clear the database in memory for test the test() method. 
 */
authController.clearDB = (req, res) => {
	return new Promise((resolve, reject) => {
		console.log("-- (Controller) authController.test() - req.body: ", req.body);

		db.deleteMany({}, function (err, num) {
			resolve({
				success: true
			});
		});
	});
};

module.exports = authController;