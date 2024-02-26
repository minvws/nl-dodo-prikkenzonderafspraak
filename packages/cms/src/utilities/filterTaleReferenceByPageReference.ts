export const filterTaleReferenceByPageReference = async ({
	document,
	parent,
	getClient,
}) => {
	// get pageReference and its connected tales
	const pageReference = await getClient({ apiVersion: '2023-05-10' }).fetch(
		`*[_id == "${parent.pageReference._ref}"][0] {taleCollection}`,
	);

	// Transform taleCollection to a array of id's
	const IDs = pageReference.taleCollection
		? pageReference.taleCollection.map((tale) => tale._ref).filter(Boolean)
		: [];

	// Only show tales which are in $tales/IDs array
	return {
		filter: '(language == $lang && _id in $tales)',
		params: {
			lang: document.language,
			tales: IDs,
		},
	};
};
