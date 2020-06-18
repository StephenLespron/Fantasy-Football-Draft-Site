const axios = require('axios');
const codes = require('../apiCodes.json');

module.exports = {
	checkESPN: async (req, res) => {
		console.log(codes.positions[0].pos, codes.positions[1].pos);
		let players;
		await axios
			.get(
				'https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/183372?view=kona_player_info'
			)
			.then((data) => {
				players = data.data.players;
			})
			.catch((err) => console.log('did not work'));

		players = players.filter(
			(elem) =>
				+elem.player.defaultPositionId === 1 ||
				+elem.player.defaultPositionId === 2 ||
				+elem.player.defaultPositionId === 3 ||
				+elem.player.defaultPositionId === 4 ||
				+elem.player.defaultPositionId === 5 ||
				+elem.player.defaultPositionId === 16
		);

		players = players.map((elem) => {
			let position =
				codes.positions[
					codes.positions.findIndex(
						(i) => +i.id === +elem.player.defaultPositionId
					)
				].pos;

			if (
				+elem.player.stats[
					elem.player.stats.findIndex((ind) => +ind.id === 102020)
				].appliedTotal > 30
			) {
				return {
					playerId: +elem.player.id,
					firstName: elem.player.firstName,
					lastName: elem.player.lastName,
					team: +elem.player.proTeamId,
					position: position,
					adp: +elem.player.ownership.averageDraftPosition,
					projPPG: +elem.player.stats[
						elem.player.stats.findIndex((ind) => +ind.id === 102020)
					].appliedAverage,
				};
			} else {
				return null;
			}
		});

		players = players.filter((value) => value !== null && value);
		console.log(players.length);
		return res.status(200).send(players);
	},
};
