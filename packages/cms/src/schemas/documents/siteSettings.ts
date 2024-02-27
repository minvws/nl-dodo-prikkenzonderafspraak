import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Site Settings',
	name: 'siteSettings',
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
			title: 'Site URL',
			name: 'baseUrl',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			title: 'Pagina titel suffix',
			name: 'pageTitleSuffix',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			title: 'Social share image',
			name: 'socialShareImage',
			description: '1200x632, geen SVG',
			type: 'image',
			validation: (Rule) => Rule.required(),
		}),

		/**
		 * Masthead
		 */
		defineField({
			title: 'Navigatiebalk',
			name: 'masthead',
			type: 'object',
			validation: (Rule) => Rule.required(),
			// hidden: true,
			options: { collapsible: true },
			fields: [
				{
					title: 'Menu',
					name: 'menu',
					type: 'object',
					fields: [
						{
							title: 'Landmark label',
							name: 'landmarkLabel',
							description:
								'Word alleen voorgelezen door screenreaders, vermijd het woord "navigatie" of "menu".',
							type: 'string',
						},
						{
							title: 'Menu button label',
							name: 'menuButtonLabel',
							type: 'string',
						},
						{
							title: 'Home label',
							name: 'homeLabel',
							type: 'string',
						},
						{
							title: 'Hoofdmenu interne links',
							name: 'internalPageCollection',
							type: 'internalPageSelector',
						},
					],
				},

				defineField({
					title: 'Skiplink',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'skiplink',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Logo
		 */
		defineField({
			title: 'Logo',
			name: 'logo',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Alternatief',
					name: 'alt',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Language selector
		 */
		defineField({
			title: 'Taal selector',
			name: 'localeSelector',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Wissel van taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'change',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Huidige taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'current',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Mastfoot
		 */
		defineField({
			title: 'Footer',
			name: 'mastfoot',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					description: 'Word alleen getoond voor screenreader gebruikers',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Kolommen',
					name: 'columns',
					type: 'array',
					validation: (Rule) => Rule.min(1).max(3),
					of: [
						{
							type: 'object',
							name: 'column',
							title: 'Kolom',
							fields: [
								defineField({
									name: 'title',
									title: 'Titel',
									type: 'string',
									validation: (Rule) => Rule.required(),
								}),
								defineField({
									name: 'content',
									title: 'Content',
									type: 'customBlock',
								}),
								defineField({
									title: 'Interne links',
									name: 'internalPageCollection',
									type: 'internalPageSelector',
								}),
							],
						},
					],
				}),
			],
		}),

		/**
		 * accessibility
		 */
		defineField({
			title: 'Toegankelijkheid',
			name: 'accessibility',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: {
				collapsible: true,
			},
			fields: [
				defineField({
					title: 'Onzichtbaar label bij externe links',
					name: 'labelExternalLink',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Onzichtbaar label bij inline modals',
					name: 'labelModal',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Onzichtbaar "Sluit" label in modals',
					name: 'labelModalClose',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Forms
		 */
		defineField({
			title: 'Formulieren',
			name: 'forms',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: {
				collapsible: true,
			},
			fields: [
				defineField({
					title: 'Filter op',
					name: 'filterOn',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Maak veld leeg',
					name: 'clearField',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Zoeken',
					name: 'search',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Privacy
		 */
		defineField({
			title: 'Privacy',
			name: 'privacy',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'id',
					name: 'id',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'USP',
					name: 'usp',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Beloftes',
					name: 'beloftes',
					type: 'array',
					validation: (Rule) => Rule.required(),
					of: [{ type: 'string' }],
					options: {
						sortable: false,
						modal: {
							type: 'popover',
						},
					},
				}),
			],
		}),

		/**
		 * Feedback
		 */
		defineField({
			title: 'Feedback',
			description: 'Wordt alleen gebruikt op de nederlandse & engelse versie',
			name: 'feedback',
			type: 'object',
			// validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Button',
					name: 'button',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Bedank',
					name: 'thanks',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'URL',
					name: 'url',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'labels',
					name: 'labels',
					type: 'object',
					// validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Ja',
							name: 'like',
							type: 'string',
						}),
						defineField({
							title: 'Nee',
							name: 'dislike',
							type: 'string',
						}),
					],
				}),
				defineField({
					title: 'Feedback blok mobiele navigatie',
					name: 'feedbackMobile',
					type: 'object',
					fields: [
						defineField({
							title: 'Titel',
							name: 'title',
							type: 'string',
						}),
					],
				}),
			],
		}),

		/**
		 * Video element
		 */
		defineField({
			title: 'Video player',
			name: 'videoPlayer',
			type: 'object',
			fields: [
				defineField({
					title: 'Open video',
					name: 'openVideo',
					type: 'string',
				}),
			],
		}),

		/**
		 * Generic labels
		 */
		defineField({
			title: 'Generieke labels',
			name: 'genericLabels',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Sluiten',
					name: 'close',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Ga naar',
					name: 'goTo',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Laatst bijgewerkt',
					name: 'updatedAt',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Vorige',
					name: 'previous',
					type: 'string',
				}),
				defineField({
					title: 'Volgende',
					name: 'next',
					type: 'string',
				}),
				defineField({
					title: 'Kaart',
					name: 'map',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Lijst',
					name: 'list',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'En',
					description: 'Het een `&` het ander',
					name: 'and',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Kilometer afkorting (km)',
					name: 'kilometerAbbr',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Meer info',
					name: 'moreInfo',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Bronnen',
					name: 'sources',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		defineField({
			title: 'Apspraak types',
			name: 'appointmentTypes',
			type: 'object',
			validation: (Rule) => Rule.required(),
			fields: [
				defineField({
					title: 'Zonder afspraak',
					name: 'pza',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Met afspraak',
					name: 'pma',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
	preview: {
		select: {
			locale: 'language',
		},
		prepare(selection) {
			const { locale } = selection;
			return {
				title: 'Site settings',
				subtitle: locale,
			};
		},
	},
});
