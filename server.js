import dotenv from "dotenv";
import express from "express";
import getDB from "./getDB.js";
import { publicIpv4 } from "public-ip";
import response from "./response/index.js";
import surroundWithTemplate from "./surround-with-template.js";
import updateDB from "./updateDB.js";

dotenv.config();

const server = express();

const db = getDB();

server.get("/:username/progress", (req, res) => {
	const user = db.users.find((user) => user.name === req.params.username);

	res.send(
		surroundWithTemplate({
			title: "Update progress",
			content: response.updateProgress(user),
		})
	);
});

server.get("/:username/update/:encodedProgressModifier", (req, res) => {
	const progressModifier = JSON.parse(
		`[${atob(req.params.encodedProgressModifier)}]`
	);

	const userIndex = db.users.findIndex(
		(user) => user.name === req.params.username
	);

	progressModifier.map((modifier, columnIndex) => {
		db.users[userIndex].progress[columnIndex] += modifier;
	});

	updateDB(db);

	res.send(
		surroundWithTemplate({
			title: "Success",
			content: response.success,
		})
	);
});

publicIpv4().then((ip) => {
	server.listen(process.env.PRIVATE_PORT, () => {
		console.log(
			`Hosted privately at http://localhost:${process.env.PRIVATE_PORT}`,
			`Hosted publicly at http://${ip}:${process.env.PUBLIC_PORT}`
		);
	});
});
