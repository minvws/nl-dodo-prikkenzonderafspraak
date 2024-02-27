const isVisibleInScrollContainer = function (el, container) {
	const { bottom, height, top } = el.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	return top <= containerRect.top
		? containerRect.top - top <= height
		: bottom - containerRect.bottom <= height;
};

export default isVisibleInScrollContainer;
