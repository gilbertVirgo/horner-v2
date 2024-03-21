import dotenv from "dotenv";
import plan from "./plan.js";

dotenv.config();

export default (progress) => {
	return progress.map((progressInColumn, columnIndex) => {
		let chaptersInColumn = 0,
			chaptersList = [];

		for (const [bookName, chaptersInBook] of plan[columnIndex]) {
			chaptersInColumn += chaptersInBook;

			if (chaptersInBook === 1) {
				chaptersList.push(bookName); // Jude should just be 'Jude' not 'Jude 1'
				continue;
			}

			chaptersList.push(
				...Array(chaptersInBook)
					.fill(null)
					.map((n, index) => `${bookName} ${index + 1}`)
			);
		}

		return chaptersList[progressInColumn % chaptersInColumn];
	});
};
