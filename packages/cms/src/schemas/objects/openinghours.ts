import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Openingstijden',
	name: 'openinghours',
	type: 'object',
	fields: [
		defineField({
			title: 'Start',
			name: 'start',
			type: 'timeString',
		}),

		defineField({
			title: 'Eind',
			name: 'end',
			type: 'timeString',
		}),
	],
	options: {
		collapsible: true,
		collapsed: false,
	},
});
