import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Tale',
	name: 'tale',
	type: 'document',
	initialValue: {
		language: 'nl',
	},
	fieldsets: [
		{
			name: 'campaign',
			title: 'Campagne',
			description: 'Verhaal velden ter invulling voor een campagne pagina',
		},
	],
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
			title: 'Quote',
			name: 'quote',
			type: 'string',
			fieldset: 'campaign',
		}),
		defineField({
			title: 'Lees meer',
			name: 'readMore',
			type: 'string',
			description: 'Knop label',
			fieldset: 'campaign',
		}),
		defineField({
			title: 'Lees minder',
			name: 'readLess',
			type: 'string',
			description: 'Knop label',
			fieldset: 'campaign',
		}),
		defineField({
			title: 'Afbeelding',
			name: 'picture',
			type: 'picture',
			description: 'Afbeelding word getoond naast de content',
		}),
		defineField({
			title: 'Content blokken',
			name: 'multiContentBlocks',
			type: 'multiContentBlocks',
		}),
	],
	preview: {
		select: {
			title: 'title',
			picture: 'picture.image',
			locale: 'language',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, picture, locale, referenceTitle } = selection;
			return {
				title: title,
				media: picture,
				subtitle: `${referenceTitle ? referenceTitle : locale}`,
			};
		},
	},
});
