import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Overzicht',
	description:
		'Deze data wordt gebruikt in overzichten. Deze data is niet verplicht omdat er terugvallen kan worden op de metaData.',
	name: 'overview',
	type: 'object',
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
		}),
		defineField({
			title: 'Icoon',
			name: 'icon',
			description: 'SVG afbeelding',
			type: 'image',
		}),
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
});
