export const filterReferenceByLanguage = ({ document }) => ({
	filter: '(language == $lang)',
	params: {
		lang: document.language,
	},
});
