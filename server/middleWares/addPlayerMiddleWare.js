module.exports = async (req, res, next) => {
	const db = req.app.get('db');
	const { playerId, teamId, draftPickIndex, ppg, adp } = req.body;

	let [player] = await db.get_player(+playerId);

	let date = Date.now();
	if (player) {
		db.join_player_team([
			+teamId,
			+playerId,
			+draftPickIndex,
			+adp,
			+ppg,
			+date,
		]);
		res.sendStatus(200);
	} else {
		next();
	}
};
