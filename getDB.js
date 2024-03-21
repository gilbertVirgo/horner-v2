import fs from "fs";
import getDirname from "./getDirname.js";
import path from "path";

export default () => {
	const dbFilePath = path.join(getDirname(import.meta.url), "db.json");

	if (!fs.existsSync(dbFilePath)) throw new Error("No db file");

	return JSON.parse(fs.readFileSync(dbFilePath));
};
