import getReadableProgress from "../getReadableProgress.js";

export default (user) => `
<h1>Update your progress</h1>
<p>Select which chapters you've read today.</p>
<button type="button" id="mark-all-button">Mark all as read</button>
<ul>
    ${getReadableProgress(user.progress)
		.map(
			(chapter, columnIndex) => `
    <li>
        <input type="checkbox" value="${columnIndex}" />
        <span>${chapter}</span>
    </li>
`
		)
		.join("")}
</ul>
<button type="button" id="submit-button">Submit</button>

<script>
const checkboxes = document.querySelectorAll("input[type='checkbox']");

const markAllButton = document.getElementById("mark-all-button");

markAllButton.addEventListener("click", () => {
    for(const checkbox of checkboxes) checkbox.checked = true;
});

const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
    window.location.href = "/${
		user.name
	}/update/" + btoa(Array.from(checkboxes).map((checkbox, index) => Number(checkbox.checked)))
});
</script>
`;