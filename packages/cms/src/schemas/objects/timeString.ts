import { defineType } from 'sanity';

export default defineType({
	title: 'Tijd',
	name: 'timeString',
	type: 'string',
	validation: (Rule) =>
		Rule.regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
			name: 'HH:MM',
		}),
});
