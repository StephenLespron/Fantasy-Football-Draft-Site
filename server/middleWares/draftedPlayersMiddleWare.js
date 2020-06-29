module.exports = async (req, res, next) => {
	const db = req.app.get('db'),
		{ draftId } = req.params;
	let drafted = await db.get_draft_players(+draftId);

	res.locals.drafted = drafted;
	next();
};
