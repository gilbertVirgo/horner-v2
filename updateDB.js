import fs from "fs";
import getDirname from "./getDirname.js";
import path from "path";

export default (updatedDB) => {
	const dbFilePath = path.join(getDirname(import.meta.url), "db.json");

	fs.writeFileSync(dbFilePath, JSON.stringify(updatedDB));
};
