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
					await db.add_teams([draft.draft_id, teams[elem]]);

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
};
