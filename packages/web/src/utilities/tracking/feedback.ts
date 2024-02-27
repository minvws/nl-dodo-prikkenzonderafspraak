export const getFeedbackUrl = (
	url: string,
	properties: { [key: string]: string | undefined } = {},
) => {
	const hiddenFields = Object.keys(properties).reduce(
		(result: string, field: string) =>
			properties[field] ? `${result}${field}=${properties[field]}&` : result,
		'#',
	);

	return `${url}${hiddenFields.slice(0, -1)}`;
};
