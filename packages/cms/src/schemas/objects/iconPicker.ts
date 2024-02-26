import { defineType } from 'sanity';
import { icons } from '@dodo/ui/types';

export default defineType({
	title: 'Icoon kiezer',
	name: 'iconPicker',
	type: 'string',
	options: {
		list: icons,
	},
});
