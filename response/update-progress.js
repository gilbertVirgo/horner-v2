import config from "../config.js";
import getReadableProgress from "../getReadableProgress.js";

const html = String.raw;

export default (user) => html`
	<h1>Update your progress</h1>
	<p>Select which chapters you've read today.</p>
	<button type="button" id="mark-all-button">Mark all as read</button>
	<ul>
		${getReadableProgress(user.progress)
			.map(
				(chapter, columnIndex) => html`
					<li>
						<input
							type="checkbox"
							value="${columnIndex}"
							${config.persistentColumns.includes(columnIndex)
								? "checked disabled"
								: ""}
						/>
						<span>${chapter}</span>
					</li>
				`
			)
			.join("")}
	</ul>
	<button type="button" id="submit-button">Submit</button>
	<a
		target="_blank"
		href="https://esv.org/${getReadableProgress(user.progress)
			.join(";")
			.replace(/ /g, "+")}"
		>Listen on esv.org</a
	>

	<script>
		const checkboxes = document.querySelectorAll("input[type='checkbox']"),
			markAllButton = document.getElementById("mark-all-button"),
			submitButton = document.getElementById("submit-button");

		markAllButton.addEventListener("click", () => {
			for (const checkbox of checkboxes) checkbox.checked = true;
		});

		submitButton.addEventListener("click", () => {
			window.location.href =
				"/${user.name}/update/" +
				btoa(
					Array.from(checkboxes).map((checkbox, index) =>
						checkbox.disabled ? 0 : Number(checkbox.checked)
					)
				);
		});
	</script>
`;
