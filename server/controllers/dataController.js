module.exports = {
	getDrafts: () => {},
	createDraft: async (req, res) => {
		const db = req.app.get('db');
		const { userId } = req.params,
			{ teams } = req.body;

		let [draft] = await db.create_draft(+userId);

		async function addTeams(length) {
			async function mapArr(elem) {
				if (elem < length) {
					await db.add_teams([
						draft.draft_id,
						teams[elem].teamName,
						teams[elem].keeperRound,
						teams[elem].draftOrder,
					]);

					let count = elem + 1;

					await mapArr(count);
				}
			}

			await mapArr(0);
		}
		await addTeams(teams.length);

		let teamsArray = await db.return_teams(draft.draft_id);

		res.status(200).send({ draftId: draft.draft_id, teams: teamsArray });
	},
	addPlayer: async (req, res) => {
		let db = req.app.get('db');
		let {
			playerId,
			firstName,
			lastName,
			team,
			position,
			teamId,
			draftPickIndex,
		} = req.body;

		await db
			.add_player([+playerId, firstName, lastName, team, position])
			.then(() => {
				db.join_player_team([+teamId, +playerId, +draftPickIndex]).catch(() =>
					res.sendStatus(`unable to join teams`)
				);
				res.sendStatus(200);
			})
			.catch(() => res.status(500).send('Unable to add player to server'));
	},
	getDraftedPlayers: async (req, res) => {
		const db = req.app.get('db'),
			{ draftId } = req.params;

		let players = await db.get_draft_players(+draftId);
		let teams = await db.get_draft_teams(+draftId);

		res.status(200).send({ players, teams });
	},
	delPlayer: (req, res) => {
		const db = req.app.get('db'),
			{ playerId } = req.params;

		db.remove_player(+playerId)
			.then(() => res.sendStatus(200))
			.catch(() => res.status(500).send('Unable to remove'));
	},
};
