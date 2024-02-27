import { defineField } from 'sanity';
import { filterTaleReferenceByPageReference } from '../../utilities/filterTaleReferenceByPageReference';

export default defineField({
	title: 'Deeplink',
	description:
		'Maakt een link naar eventueel beschikbare verhalen op de gelinkte pagina',
	name: 'taleDeeplink',
	type: 'reference',
	to: [{ type: 'tale' }],
	options: {
		filter: filterTaleReferenceByPageReference,
	},
});
