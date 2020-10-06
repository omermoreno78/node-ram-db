const express = require('express');
const app = express();
const db = require('./db').db;

// #region Settings.
app.set('port', process.env.PORT || 3000);
// #endregion Settings.

// #region Middlewares.
app.use(express.json());
// #endregion Middlewares.

// #region Routes.
app.use('/api/auth', require('./routes/auth'));
// #endregion Routes.

// Starting the server:
app.listen(app.get('port'), () => {
	console.log('Server on port ', app.get('port'));
});