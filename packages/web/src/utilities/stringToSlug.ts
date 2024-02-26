import slugify from 'slugify';

export const stringToSlug = (string: string) =>
	string && string.length
		? slugify(string, {
				strict: true,
				lower: true,
		  })
		: undefined;
