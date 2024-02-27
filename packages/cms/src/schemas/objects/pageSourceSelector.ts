import { defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineField({
	title: 'Pagina referentie',
	description: 'Creëert een interne referentie naar een andere pagina.',
	name: 'pageSourceSelector',
	type: 'reference',
	to: [
		{ type: 'home-page' },
		{ type: 'locations-page' },
		{ type: 'generic-page' },
	],
	options: {
		filter: filterReferenceByLanguage,
	},
});
