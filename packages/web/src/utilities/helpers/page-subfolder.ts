// TODO: type safety

import { stringToSlug } from '../stringToSlug';

export const getPageSubfolder = (page): string => {
	let slug = '';

	// iterate over subFolderReferences without recursion
	if (page.subFolderReference) {
		const stack = [page.subFolderReference];
		while (stack?.length > 0) {
			const currentObj = stack.pop();
			Object.keys(currentObj).forEach((key) => {
				if (key === 'slug') {
					slug = `/${currentObj[key]}${slug}`;
				}
				if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
					stack.push(currentObj[key]);
				}
			});
		}
	}

	return slug === '' ? undefined : slug.replace('/', '');
};

export const getFullPageUrl = (page): string => {
	const subFolder = getPageSubfolder(page);

	return `${subFolder ? `${subFolder}/` : ''}${page.slug || ''}${
		page.deepLink ? `#${stringToSlug(page.deepLink)}` : ''
	}`;
};
