import config from "./config.js";
import dotenv from "dotenv";
import getDB from "./getDB.js";
import getReadableProgress from "./getReadableProgress.js";
import { publicIpv4 } from "public-ip";
import transporter from "./email-transporter.js";
import updateDB from "./updateDB.js";
dotenv.config();

const db = getDB();

publicIpv4().then((ip) => {
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
		transporter.sendMail(
			{
				from: process.env.EMAIL_ADDRESS,
				to: user.email,
				subject: `Today's Horner Readings`,
				text:
					getReadableProgress(user.progress).join("\n") +
					`\n\nUpdate progress here: http://${ip}:${process.env.PUBLIC_PORT}/${user.name}/progress`,
			},
			(error, info) => {
				if (error) console.error("Error", error);
				else console.log("Email sent", info.response);
			}
		);
	}
});
