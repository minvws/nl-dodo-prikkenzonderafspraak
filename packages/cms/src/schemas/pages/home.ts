import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Home pagina',
	name: 'home-page',
	type: 'document',
	initialValue: {
		language: 'nl',
	},
	fieldsets: [{ name: 'urlStructure', title: 'Url structuur' }],
	fields: [
		defineField({
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),

		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		}),

		defineField({
			title: 'Toon het feedback blok',
			name: 'showFeedback',
			type: 'boolean',
			description: 'Als deze toggle aan staat genereren we een feedback blok.',
		}),

		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),

		defineField({
			title: 'Knoppen',
			name: 'buttons',
			type: 'array',
			validation: (Rule) => Rule.min(1).max(2),
			of: [
				defineField({
					title: 'Knop',
					name: 'button',
					type: 'flexibleButton',
				}),
			],
		}),

		defineField({
			title: 'Content onder knoppen',
			name: 'contentSecondary',
			type: 'customBlock',
		}),

		defineField({
			title: 'Verhalen',
			name: 'taleCollection',
			type: 'taleSelector',
		}),

		defineField({
			title: 'Hulp',
			name: 'assistance',
			type: 'reference',
			to: [{ type: 'assistance' }],
			options: {
				filter: filterReferenceByLanguage,
			},
		}),
	],
	preview: {
		select: {
			title: 'hero.title',
			locale: 'language',
			media: 'hero.image',
		},
		prepare(selection) {
			const { title, locale, slug, subFolderReferenceSlug, media } = selection;
			return {
				title: title,
				subtitle: `/${locale}`,
				media,
			};
		},
	},
});
