module.exports = (req, res, next) => {
	if (req.session.players) {
		let drafted = [];
		if (res.locals.drafted) {
			drafted = res.locals.drafted;
		}

		//removes drafted players
		let filterPlayers = req.session.players.filter((el) => {
			let filter = true;
			// eslint-disable-next-line array-callback-return
			res.locals.drafted.map((el2) => {
				if (el.playerId === el2.player_id) {
					filter = false;
				}
			});

			return filter;
		});

		console.log('players: middleware');
		res.status(200).send({
			avail: filterPlayers,
			drafted: drafted,
		});
	} else {
		console.log('players: all');
		next();
	}
};
