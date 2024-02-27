import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Openingstijden',
	name: 'openinghoursoverride',
	type: 'object',

	preview: {
		select: {
			date: 'date',
		},
		prepare({ date }: { date: string }) {
			return {
				title: date ? date.split('-').reverse().join('-') : '',
			};
		},
	},

	fields: [
		defineField({
			title: 'Datum',
			name: 'date',
			type: 'date',
			options: {
				dateFormat: 'DD-MM-YYYY',
			},
		}),

		defineField({
			title: 'Openingstijden',
			name: 'openinghours',
			type: 'array',
			of: [{ type: 'openinghours' }],
		}),
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
});
