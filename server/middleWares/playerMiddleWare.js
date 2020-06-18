module.exports = (req, res, next) => {
	if (req.session.players) {
		res.status(200).send(req.session.players);
	} else {
		next();
	}
};
