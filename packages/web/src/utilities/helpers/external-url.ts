export const isExternalUrl = (url: string) => {
	return url.includes('//') /*|| url.includes(':')*/;
};
