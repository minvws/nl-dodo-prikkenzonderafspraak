import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'video',
	name: 'video',
	type: 'object',
	fields: [
		defineField({
			title: 'Video embed URL',
			name: 'url',
			type: 'url',
			description: 'Video opent op een externe website, bijvoorbeeld YouTube',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Cover image',
			name: 'picture',
			type: 'picture',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Ondertiteling',
			name: 'subtitle',
			type: 'string',
			description: 'Link naar de bron van het ondertitelingsbestand',
		}),
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			description: 'Word getoond/voorgelezen aan screenreader gebruikers',
			validation: (Rule) => Rule.required(),
		}),
	],
	options: {
		collapsible: true,
		collapsed: false,
	},
	preview: {
		select: {
			title: 'title',
			subtitle: 'url',
			media: 'picture.image',
		},
	},
});
