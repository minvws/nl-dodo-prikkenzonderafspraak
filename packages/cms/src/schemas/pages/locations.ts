import { isUniqueInLocale } from '../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'locations-page' });
}

export default defineType({
	title: 'Locaties pagina',
	name: 'locations-page',
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
			title: 'Resultaten',
			name: 'result',
			type: 'object',
			validation: (Rule) => Rule.required(),
			fields: [
				defineField({
					title: 'Laad status',
					name: 'loading',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Geen resultaat',
					name: 'noResult',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		defineField({
			title: 'Filter',
			name: 'filter',
			type: 'object',
			fields: [
				defineField({
					title: 'Zoek op plaatsnaam',
					name: 'searchLabel',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		defineField({
			title: 'Locatie',
			name: 'location',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Openinstijden',
					name: 'openingHours',
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
							title: 'Tekst boven openingstijden tabel',
							name: 'content',
							type: 'customBlock',
						}),
						defineField({
							title: 'Onbekende tijden',
							name: 'unknownOpeningHours',
							type: 'string',
						}),
						defineField({
							title: 'Nu open',
							name: 'openNow',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Vandaag geopend',
							name: 'openToday',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Open vanaf',
							name: 'openFrom',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Gesloten',
							name: 'closed',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Feedback',
							name: 'feedback',
							type: 'object',
							// validation: (Rule) => Rule.required(),
							fields: [
								defineField({
									title: 'Tekst',
									name: 'content',
									type: 'string',
									// validation: (Rule) => Rule.required(),
								}),
								defineField({
									title: 'Link label',
									name: 'label',
									type: 'string',
									// validation: (Rule) => Rule.required(),
								}),
							],
						}),
					],
				}),

				defineField({
					title: '"Maak afspraak" knop',
					name: 'appointmentButton',
					type: 'object',
					validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Label',
							name: 'label',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
					],
				}),

				defineField({
					title: 'Kopieer knop',
					name: 'copyButton',
					type: 'object',
					validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Kopieer',
							name: 'copy',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Gekopieerd',
							name: 'copied',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
				defineField({
					title: 'Instructies',
					name: 'instructions',
					type: 'customBlock',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Notitie',
					name: 'note',
					type: 'object',
					fields: [
						defineField({
							title: 'Let op',
							name: 'title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Infoblok Zonder afspraak',
							name: 'pzaInfo',
							type: 'object',
							validation: (Rule) => Rule.required(),
							preview: {
								select: {
									title: 'label',
								},
							},
							fields: [
								defineField({
									title: 'Label',
									name: 'label',
									type: 'customBlock',
								}),
								defineField({
									title: 'Icoon',
									name: 'icon',
									type: 'iconPicker',
								}),
							],
						}),
						defineField({
							title: 'Infoblok Met afspraak',
							name: 'pmaInfo',
							type: 'object',
							validation: (Rule) => Rule.required(),
							preview: {
								select: {
									title: 'label',
								},
							},
							fields: [
								defineField({
									title: 'Label',
									name: 'label',
									type: 'customBlock',
								}),
								defineField({
									title: 'Icoon',
									name: 'icon',
									type: 'iconPicker',
								}),
							],
						}),
						defineField({
							title: 'Infoblok Zonder afspraak & Met afspraak',
							name: 'pzaPmaInfo',
							type: 'object',
							validation: (Rule) => Rule.required(),
							preview: {
								select: {
									title: 'label',
								},
							},
							fields: [
								defineField({
									title: 'Label',
									name: 'label',
									type: 'customBlock',
								}),
								defineField({
									title: 'Icoon',
									name: 'icon',
									type: 'iconPicker',
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			title: 'Over deze locatie',
			name: 'about',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Onderdelen',
					name: 'items',
					type: 'array',
					of: [
						defineField({
							title: 'Onderdeel',
							name: 'item',
							type: 'object',
							preview: {
								select: {
									title: 'label',
								},
							},
							fields: [
								defineField({
									title: 'Label',
									name: 'label',
									type: 'customBlock',
								}),
								defineField({
									title: 'Icoon',
									name: 'icon',
									type: 'iconPicker',
								}),
							],
						}),
					],
				}),
			],
		}),

		defineField({
			title: 'Dit neem je mee',
			name: 'bring',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Onderdelen',
					name: 'items',
					type: 'array',
					of: [
						defineField({
							title: 'Onderdeel',
							name: 'item',
							type: 'object',
							preview: {
								select: {
									title: 'label',
									subtitle: 'icon',
								},
							},
							fields: [
								defineField({
									title: 'Label',
									name: 'label',
									type: 'customBlock',
								}),
								defineField({
									title: 'Icoon',
									name: 'icon',
									type: 'iconPicker',
								}),
							],
						}),
					],
				}),
			],
		}),

		defineField({
			title: 'Wat kun je verwachten?',
			name: 'expectations',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
				}),
			],
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
		},
		prepare(selection) {
			const { title, locale, slug, subFolderReferenceSlug, media } = selection;
			return {
				title: title,
				subtitle: `/${locale}${
					subFolderReferenceSlug ? `/…/${subFolderReferenceSlug}` : ''
				}/${slug}`,
				media,
			};
		},
	},
});
