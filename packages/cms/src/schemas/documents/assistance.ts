import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Hulp document',
	name: 'assistance',
	type: 'document',
	initialValue: {
		language: 'nl',
	},
	preview: {
		select: {
			title: 'title',
			phoneNumber: 'phone.phoneNumber',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, phoneNumber, referenceTitle } = selection;
			return {
				title: title,
				subtitle: `${phoneNumber}${
					referenceTitle ? ` - ${referenceTitle}` : ''
				}`,
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
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Tekst',
			name: 'text',
			type: 'string',
		}),

		defineField({
			title: 'Telefoon velden',
			name: 'phone',
			type: 'object',
			fieldsets: [
				{
					name: 'hoursSelectedFieldset',
					title: 'Selecteer de openingstijden',
					options: { columns: 2 },
				},
			],
			fields: [
				defineField({
					title: 'Telefoonnummer',
					name: 'phoneNumber',
					type: 'string',
				}),
				defineField({
					title: 'Label openingstijden Telefoonnummer',
					name: 'openingHourLabel',
					type: 'string',
				}),
				defineField({
					name: 'openingHour',
					title: 'Openingstijd',
					type: 'number',
					fieldset: 'hoursSelectedFieldset',
					options: {
						list: Array.from({ length: 24 }, (_, index) => ({
							title: `${index}:00`,
							value: index,
						})),
					},
				}),
				defineField({
					name: 'closingHour',
					title: 'Sluitingstijd',
					type: 'number',
					fieldset: 'hoursSelectedFieldset',
					options: {
						list: Array.from({ length: 24 }, (_, index) => ({
							title: `${index}:00`,
							value: index,
						})),
					},
				}),
				defineField({
					title: 'Label nu open',
					name: 'nowOpen',
					type: 'string',
					description: 'bv: "Nu bereikbaar"',
				}),
			],
		}),

		defineField({
			title: 'Hulp nodig?',
			name: 'getHelp',
			type: 'object',
			fields: [
				defineField({
					title: 'Title',
					name: 'title',
					type: 'string',
				}),
			],
		}),
	],
});
