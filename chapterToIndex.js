// This script isn't used in production. Just a diagnostic.

// Usage node chapterToIndex.js "1 Corinthians 7"

import minimist from "minimist";
import plan from "./plan.js";

const {
	_: [chapter],
} = minimist(process.argv.slice(2));

const query = {};
query.chapterNumber = +chapter.split(" ").slice(-1)[0];
query.bookTitle = chapter
	.replace(new RegExp(query.chapterNumber + "$"), "")
	.trim();

const match = {};

for (const [columnIndex, column] of plan.entries()) {
	let chapterIndex = 0;

	for (const [bookTitle, bookLength] of column) {
		if (bookTitle === query.bookTitle) {
			match.columnIndex = columnIndex;
			match.chapterIndex = chapterIndex + query.chapterNumber;

			break;
		}

		chapterIndex += bookLength;
	}

	if (match.hasOwnProperty("columnIndex")) break;
}

console.log(match);
