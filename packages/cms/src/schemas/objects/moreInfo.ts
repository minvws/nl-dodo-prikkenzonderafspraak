import { defineField, defineType } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Meer info',
	name: 'moreInfo',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
		}),
		defineField({
			title: 'Selecteer items',
			name: 'items',
			type: 'array',
			of: [
				defineField({
					title: 'Pagina referentie',
					name: 'item',
					type: 'pageSourceSelector',
				}),
			],
		}),
	],
});
