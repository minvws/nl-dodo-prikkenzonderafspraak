import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'GGDs',
	name: 'ggd-document',
	type: 'document',
	fields: [
		defineField({
			title: 'Naam',
			name: 'name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name',
			},
			validation: (Rule) => Rule.required(),
		}),
	],
});
