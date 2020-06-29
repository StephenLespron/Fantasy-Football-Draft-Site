const axios = require('axios');
const codes = require('../apiCodes.json');

module.exports = {
	callESPN: async (req, res) => {
		let players;

		//Gets players from ESPN's API
		await axios
			.get(
				'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/183372?view=kona_player_info'
			)
			.then((data) => {
				players = data.data.players;
			})
			.catch((err) => console.log('did not work'));

		// Filters players by position and team (removes free agents and unneeded positions)
		players = players.filter(
			(elem) =>
				(+elem.player.defaultPositionId <= 5 ||
					+elem.player.defaultPositionId === 16) &&
				((+elem.player.proTeamId >= 1 && +elem.player.proTeamId <= 30) ||
					+elem.player.proTeamId === 33 ||
					+elem.player.proTeamId === 34)
		);

		//Maps over player array and removes unneeded data
		players = players.map((elem) => {
			//converts position code to string
			let position =
				codes.positions[
					codes.positions.findIndex(
						(i) => +i.id === +elem.player.defaultPositionId
					)
				].pos;

			//converts team code to string
			let team =
				codes.teams[
					codes.teams.findIndex((i) => +i.id === +elem.player.proTeamId)
				].team;

			//removes any player projected less than 30 points on the season
			if (
				+elem.player.stats[
					elem.player.stats.findIndex((ind) => +ind.id === 102020)
				].appliedTotal > 30
			) {
				//returns new object for each player
				return {
					playerId: +elem.player.id,
					firstName: elem.player.firstName,
					lastName: elem.player.lastName,
					team: team,
					position: position,
					adp: +elem.player.ownership.averageDraftPosition,
					ppg: +elem.player.stats[
						elem.player.stats.findIndex((ind) => +ind.id === 102020)
					].appliedAverage.toFixed(2),
				};
			} else {
				return null;
			}
		});

		//removes empty objects in array
		players = players.filter((value) => value !== null && value);

		//sorts players by average draft position
		players = players.sort((a, b) => (a.adp > b.adp ? 1 : -1));

		//converts adp to incrementing integer
		for (let i = 0; i < players.length; i++) {
			players[i].adp = i + 1;
		}

		//stores players on session to reduce full API calls
		req.session.players = players.map((el) => el);

		//removes drafted players
		let filterPlayers = players.filter((el) => {
			let filter = true;
			// eslint-disable-next-line array-callback-return
			res.locals.drafted.map((el2) => {
				if (el.playerId === el2.player_id) {
					filter = false;
				}
			});

			return filter;
		});

		if (res.locals.drafted) {
			res.status(200).send({
				avail: filterPlayers,
				drafted: res.locals.drafted,
			});
		} else if (!res.locals.drafted) {
			res.status(200).send({ avail: filterPlayers, drafted: [] });
		} else {
			console.log('players: failed');
			res.status(500).send(() => `${res.locals}, ${req.session}`);
		}
	},
};
