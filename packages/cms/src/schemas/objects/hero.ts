import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Hero',
	name: 'hero',
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
			title: 'Chapeau',
			name: 'chapeau',
			type: 'string',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Toon afbeelding als foto',
			name: 'isPhoto',
			type: 'boolean',
		}),
		defineField({
			title: 'Toon "Laatst bijgewerkt:"',
			name: 'showUpdatedAt',
			type: 'boolean',
		}),
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
});
