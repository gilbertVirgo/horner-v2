const html = String.raw;

export default html`<h1>Success</h1>
	<p>You can now close this tab</p>
	<p>
		<button type="button" onclick="goToProgressPage()">
			Back to my progress
		</button>
	</p>
	<script>
		const goToProgressPage = () =>
			(window.location.href =
				"/" + window.location.pathname.split("/")[1] + "/progress");
	</script>`;
