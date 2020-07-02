const nodemailer = require('nodemailer'),
	{ EMAIL_USER, EMAIL_PASS } = process.env;

module.exports = async (req, res) => {
	const db = req.app.get('db'),
		{ username, draftId, email } = req.body;

	console.log(draftId);

	let players;

	await db
		.get_draft_players(+draftId)
		.then((data) => {
			players = data
				.sort((a, b) => a.team_name > b.team_name)
				.map((el) => {
					return `<tr>
                <td>${el.team_name}</td>
                <td>${el.first_name} ${el.last_name}</td>
                <td>${el.draft_pick_index}</td>
                </tr>`;
				});
		})
		.catch(() => `unable to get players`);

	let draftDate = await db.get_draft_date(+draftId);
	let date = new Date(draftDate[0].date);
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let year = date.getFullYear();

	let rows = players.join('');

	let table = `<table id='mytable'>
                <tr>
                    <th>Team</th>
                    <th>Name</th>
                    <th>Pick</th>
                </tr>
                ${rows}
            </table>`;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: EMAIL_USER,
		to: email,
		subject: `Draft results (${month}-${day}-${year})`,
		html: `<html>
        <head>
          <style>
            table {
              width: 100%;
            }
            tr {
              text-align: left;
              border: 1px solid black;
            }
            th, td {
              padding: 15px;
            }
            tr:nth-child(odd) {
              background: #CCC
            }
            tr:nth-child(even) {
              background: #FFF
            }
            .no-content {
              background-color: red;
            }
          </style>
        </head>
        <body>
        <div>
        <p>Hi ${username[0].toUpperCase() + username.slice(1)}!</p>
        <p>Here are the results for draft id#${draftId}</p>
        ${table}

        <p>Thank you! See you next year.</p>
        </div>
        </body>
        </html>`,
	};

	transporter.sendMail(mailOptions, (err) => {
		!err ? res.sendStatus(200) : res.status(200).send(`Email Sent`);
	});
};
