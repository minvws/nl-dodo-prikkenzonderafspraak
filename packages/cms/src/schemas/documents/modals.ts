import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Modals',
	name: 'modals',
	type: 'document',
	initialValue: {
		language: 'nl',
	},
	preview: {
		select: {
			title: 'title',
			locale: 'language',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, locale, referenceTitle } = selection;
			return {
				title: title,
				subtitle: `${referenceTitle ? referenceTitle : locale}`,
			};
		},
	},
	fields: [
		defineField({
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),

		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlockWithoutModal',
			validation: (Rule) => Rule.required(),
		}),
	],
});
