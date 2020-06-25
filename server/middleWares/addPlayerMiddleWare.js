module.exports = async (req, res, next) => {
	const db = req.app.get('db');
	const { playerId, teamId, draftPickIndex } = req.body;

	let [player] = await db.get_player(+playerId);
	console.log(player);

	if (player) {
		db.join_player_team([+teamId, +playerId, +draftPickIndex]);
		res.sendStatus(200);
	} else {
		next();
	}
};
