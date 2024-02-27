import { defineType, defineField } from 'sanity';

const today = new Date().toISOString().split('T')[0];

export default defineType({
	title: 'Locaties',
	name: 'location-document',
	type: 'document',

	preview: {
		select: {
			name: 'name',
			city: 'location.city',
			address: 'location.address',
			appointmentType: 'appointmentType',
			show: 'show',
			test: 'isTestLocation',
		},
		prepare({ name, city, address, appointmentType, show, test }) {
			const end = show?.end;
			const start = show?.start;

			let closed = false;

			if (end !== undefined && end < today) {
				closed = true;
			}

			if (start !== undefined && start > today) {
				closed = true;
			}

			return {
				title: `${test ? 'TEST - ' : ''}${name ? `${name} - ` : ''}${address}`,
				subtitle: `${city} (${closed ? 'Gesloten' : 'Open'})${
					appointmentType
						? ` (${appointmentType
								.map((type) =>
									type === 'pma' ? 'Met afspraak' : 'Zonder afspraak',
								)
								.join(', ')})`
						: ''
				}`,
			};
		},
	},

	fields: [
		defineField({
			title: 'Test locatie',
			name: 'isTestLocation',
			type: 'boolean',
			description:
				'Als deze toggle aan staat zal de locatie niet getoond worden op productie.',
		}),

		defineField({
			title: 'Naam',
			name: 'name',
			type: 'string',
		}),

		defineField({
			title: 'Locatie',
			name: 'location',
			type: 'object',
			options: { collapsible: true, collapsed: false },
			validation: (Rule) => Rule.required(),
			fields: [
				defineField({
					title: 'Adres',
					name: 'address',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),

				defineField({
					title: 'Postcode',
					name: 'zipcode',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),

				defineField({
					title: 'Plaats',
					name: 'city',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),

				defineField({
					title: 'Coördinaten',
					name: 'coordinates',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		defineField({
			title: 'GGD',
			name: 'GGD',
			type: 'reference',
			to: [{ type: 'ggd-document' }],
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			title: 'Afspraak type',
			name: 'appointmentType',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule: any) => Rule.required(),
			options: {
				list: [
					{ title: 'Zonder afspraak', value: 'pza' },
					{ title: 'Met afspraak', value: 'pma' },
				],
			},
		}),

		defineField({
			title: 'Weergave',
			name: 'show',
			type: 'object',
			options: { collapsible: true, collapsed: false },
			fields: [
				defineField({
					title: 'Locatie tonen vanaf',
					name: 'start',
					type: 'date',
					options: {
						dateFormat: 'DD-MM-YYYY',
					},
				}),
				defineField({
					title: 'Locatie tonen tot en met',
					name: 'end',
					type: 'date',
					options: {
						dateFormat: 'DD-MM-YYYY',
					},
				}),
			],
		}),

		defineField({
			title: 'Openingstijden',
			name: 'openingHours',
			type: 'object',
			options: { collapsible: true, collapsed: false },

			fields: [
				defineField({
					title: 'Vaste openingstijden',
					name: 'scheme',
					type: 'object',
					options: { collapsible: true, collapsed: false },
					fields: [
						defineField({
							title: 'Maandag',
							name: 'monday',
							type: 'array',
							of: [{ type: 'openinghours' }],
						}),
						defineField({
							title: 'Dinsdag',
							name: 'tuesday',
							type: 'array',
							of: [{ type: 'openinghours' }],
						}),
						defineField({
							title: 'Woensdag',
							name: 'wednesday',
							type: 'array',
							of: [{ type: 'openinghours' }],
						}),
						defineField({
							title: 'Donderdag',
							name: 'thursday',
							type: 'array',
							of: [{ type: 'openinghours' }],
						}),
						defineField({
							title: 'Vrijdag',
							name: 'friday',
							type: 'array',
							of: [{ type: 'openinghours' }],
						}),
						defineField({
							title: 'Zaterdag',
							name: 'saturday',
							type: 'array',
							of: [{ type: 'openinghours' }],
						}),
						defineField({
							title: 'Zondag',
							name: 'sunday',
							type: 'array',
							of: [{ type: 'openinghours' }],
						}),
					],
				}),

				defineField({
					title: 'Afwijkende openingstijden',
					name: 'overrides',
					type: 'array',
					of: [{ type: 'openinghoursoverride' }],
				}),
			],
		}),

		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: ({
					name,
					location,
					isTestLocation,
				}: {
					name: string;
					location: { city: string; address: string };
					isTestLocation?: boolean;
				}): string =>
					`${isTestLocation ? 'test-' : ''}${name ? `${name}-` : ''}${
						location.city
					}-${location.address}`,
			},

			validation: (Rule) => Rule.required(),
		}),
	],
});
