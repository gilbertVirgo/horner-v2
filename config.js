const scale = 2000,
	gutter = 0.02;

export default {
	persistentColumns: [0, 1, 2], // These chapters will always advance and will not need to be marked as read
	printDimensions: {
		width: Math.sqrt(2) * 2000,
		height: scale,
		margin: gutter * scale,
	},
};
