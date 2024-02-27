import { availableLocales } from '@dodo/ui/helpers';

// PZA only needs to support Dutch and English so we filter the other languages out
export const languages = availableLocales
	.filter((locale) => ['nl', 'en'].includes(locale.id))
	.map((locale) => ({
		id: locale.id,
		title: locale.dutchName,
	}));
