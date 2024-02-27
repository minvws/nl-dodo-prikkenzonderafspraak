import { isUniqueInLocale } from '../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'generic-page' });
}

export default defineType({
	title: 'Generic pages',
	name: 'generic-page',
	type: 'document',
	initialValue: {
		language: 'nl',
	},
	fieldsets: [
		{ name: 'urlStructure', title: 'Url structuur' },
		{
			title: 'Verhalen',
			name: 'tales',
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
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		}),
		defineField({
			title: 'Overzicht',
			name: 'overview',
			type: 'overview',
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
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),

		defineField({
			title: 'Als FAQ?',
			description: 'Toon verhalen als FAQ items',
			name: 'talesAsDisclosure',
			type: 'boolean',
			fieldset: 'tales',
		}),

		defineField({
			title: 'Verhalen',
			description: 'Verhalen op deze pagina worden getoond als een accordion',
			name: 'taleCollection',
			type: 'taleSelector',
			fieldset: 'tales',
		}),

		defineField({
			title: 'Meer info',
			name: 'moreInfo',
			type: 'moreInfo',
		}),

		defineField({
			title: 'Bronnen',
			name: 'sources',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					description:
						'Indien titel leeg word gelaten wordt `Bronnen` in siteSettings getoond',
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
				}),
			],
		}),

		defineField({
			title: 'Toon het feedback blok',
			name: 'showFeedback',
			type: 'boolean',
			description: 'Als deze toggle aan staat genereren we een feedback blok.',
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
		defineField({
			title: 'Sub pagina referentie',
			description:
				'Genereert deze pagina onder een andere pagina in de hierachie',
			name: 'subFolderReference',
			type: 'pageSourceSelector',
			fieldset: 'urlStructure',
		}),

		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			fieldset: 'urlStructure',
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
			subFolderReferenceSlug: 'subFolderReference.slug.current',
			media: 'hero.image',
			overviewTitle: 'overview.title',
			overviewIcon: 'overview.icon',
		},
		prepare(selection) {
			const {
				title,
				locale,
				slug,
				subFolderReferenceSlug,
				media,
				overviewTitle,
				overviewIcon,
			} = selection;
			return {
				title: overviewTitle || title,
				subtitle: `/${locale}${
					subFolderReferenceSlug ? `/…/${subFolderReferenceSlug}` : ''
				}/${slug}`,
				media: overviewIcon || media,
			};
		},
	},
});
