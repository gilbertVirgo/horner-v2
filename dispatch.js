import config from "./config.js";
import dotenv from "dotenv";
import getDB from "./getDB.js";
import getReadableProgress from "./getReadableProgress.js";
import minimist from "minimist";
import { publicIpv4 } from "public-ip";
import transporter from "./email-transporter.js";
import updateDB from "./updateDB.js";

dotenv.config();

const argv = minimist(process.argv.slice(2)),
	db = getDB();

publicIpv4().then((ip) => {
	if (argv.to !== undefined) {
		// Only send to that user
		db.users = db.users.filter((user) => user.email === argv.to);
	}

	// Increase persistent columns
	for (let userIndex in db.users) {
		const { progress: currentProgress } = db.users[userIndex];

		if (db.users[userIndex])
			db.users[userIndex].progress = currentProgress.map(
				(columnValue, columnIndex) =>
					config.persistentColumns.includes(columnIndex)
						? columnValue + 1
						: columnValue
			);
	}

	updateDB(db);

	for (const user of db.users) {
		const readableProgress = getReadableProgress(user.progress);

		transporter.sendMail(
			{
				from: process.env.EMAIL_ADDRESS,
				to: user.email,
				subject: `Today's Horner Readings`,
				text:
					readableProgress.join("\n") +
					`\n\nListen here: https://esv.org/${readableProgress
						.join(";")
						.replace(/ /g, "+")}` +
					`\n\nUpdate progress here: http://${ip}:${process.env.PUBLIC_PORT}/${user.name}/progress`,
			},
			(error, info) => {
				if (error) console.error("Error", error);
				else console.log("Email sent", info.response);
			}
		);
	}
});
