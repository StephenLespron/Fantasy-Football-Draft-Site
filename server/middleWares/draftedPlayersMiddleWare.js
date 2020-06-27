module.exports = async (req, res, next) => {
	const db = req.app.get('db'),
		{ draftId } = req.params;
	let drafted = await db.get_draft_players(+draftId);

	if (drafted) {
		res.locals.drafted = drafted;
		res.locals.teams = await db.return_teams(+draftId);
		next();
	} else {
		next();
	}
};
