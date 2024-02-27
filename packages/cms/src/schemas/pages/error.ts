import { isUniqueInLocale } from '../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'error-page' });
}

export default defineType({
	title: '404 Pagina',
	name: 'error-page',
	type: 'document',
	initialValue: {
		language: 'nl',
	},
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
			title: 'Kruimelpad titel',
			name: 'breadcrumbTitle',
			type: 'string',
			description: 'Verkorte kruimelpad titel (optioneel)',
		}),

		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),
		defineField({
			title: 'Button',
			name: 'button',
			type: 'flexibleButton',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),
		defineField({
			title: 'Technische melding',
			name: 'errormessage',
			type: 'string',
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'metaData.title',
				isUnique: isUnique,
			},
		}),
	],
	preview: {
		select: {
			title: 'hero.title',
			locale: 'language',
			slug: 'slug.current',
		},
		prepare(selection) {
			const { title, locale, slug } = selection;
			return {
				title: title,
				subtitle: `${locale}/${slug}`,
			};
		},
	},
});
