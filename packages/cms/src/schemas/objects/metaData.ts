import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Page meta data',
	name: 'metaData',
	type: 'object',
	validation: (Rule) => Rule.required(),
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Omschrijving',
			name: 'description',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Social share image',
			name: 'socialShareImage',
			description: '1200x632, geen SVG',
			type: 'image',
		}),
		defineField({
			title: 'Geen geldig zoekresultaat',
			name: 'noIndex',
			type: 'boolean',
			description:
				'Als deze toggle aan staat zal de pagina niet geindexeerd worden door zoekmachines.',
		}),
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
});
