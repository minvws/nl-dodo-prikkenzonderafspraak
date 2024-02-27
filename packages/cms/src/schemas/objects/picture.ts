import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Afbeelding',
	name: 'picture',
	type: 'object',
	fields: [
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
			// validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Alt tekst',
			name: 'alt',
			type: 'string',
			description:
				'Beschrijf zo duidelijk mogelijk wat er op de afbeelding te zien is. Laat leeg wanneer de afbeelding puur decoratief is.',
		}),
	],
	options: {
		collapsible: true,
		collapsed: false,
	},
	preview: {
		select: {
			title: 'image.asset.originalFilename',
			subtitle: 'alt',
			media: 'image',
		},
	},
});
