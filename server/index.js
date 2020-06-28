require('dotenv').config();

const express = require('express'),
	massive = require('massive'),
	session = require('express-session'),
	app = express(),
	{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const authCtrl = require('./controllers/authController'),
	playerCtrl = require('./controllers/playerController'),
	dataCtrl = require('./controllers/dataController'),
	playerMiddleWare = require('./middleWares/playerMiddleWare'),
	addPlayerMiddleWare = require('./middleWares/addPlayerMiddleWare'),
	draftedPlayersMiddleWare = require('./middleWares/draftedPlayersMiddleWare');

app.use(express.json());
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, //1 week
	})
);

//Auth EPs
app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);
app.post('/auth/logout', authCtrl.logout);
app.get('/auth/getUser', authCtrl.getUser);
app.put('/auth/updateUser/:userId', authCtrl.updateUser);
app.delete('/auth/deleteUser/:userId', authCtrl.deleteUser);

//Draft EPs
app.post(`/api/createDraft/:userId`, dataCtrl.createDraft);
app.get(`/api/drafts/:userId`, dataCtrl.getDrafts);
app.post(
	'/api/players/:draftId',
	draftedPlayersMiddleWare,
	playerMiddleWare,
	playerCtrl.callESPN
);
app.post('/api/addPlayer', addPlayerMiddleWare, dataCtrl.addPlayer);
app.delete('/api/removePlayer/:playerId', dataCtrl.delPlayer);
app.get(`/api/draftedPlayers/:draftId`, dataCtrl.getDraftedPlayers);
app.get(`/api/getTeams/:draftId`, dataCtrl.getTeams);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
})
	.then((db) => {
		app.set('db', db);
		console.log('DB running on');
		app.listen(SERVER_PORT, () => console.log(`port: ${SERVER_PORT}`));
	})
	.catch((err) => console.log(err));
