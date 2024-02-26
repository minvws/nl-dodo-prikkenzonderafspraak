const checkSize = () => {
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;
	document.documentElement.style.setProperty(
		'--scrollbar__inline-size',
		`${scrollbarWidth}px`,
	);
};

export default checkSize;
