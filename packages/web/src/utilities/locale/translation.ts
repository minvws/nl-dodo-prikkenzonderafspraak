import { isExternalUrl } from '../helpers/external-url';
import {
	availableLocales as availableLocalesUI,
	type Locale,
} from '@dodo/ui/helpers';
export { type Locale, getLocaleFromURL } from '@dodo/ui/helpers';

// PZA only needs to support Dutch and English so we filter the other languages out
export const availableLocales = availableLocalesUI.filter((locale) =>
	['nl', 'en'].includes(locale.id),
);

/**
 * Small helper method that prefixes the requested url with a locale.
 */
export const prefixUrlWithlocale = (href: string, locale: Locale) =>
	// check if href aready contains a available locale
	availableLocales.filter(
		(localeTest) =>
			href === localeTest.id || href.startsWith(localeTest.urlPrefix),
	).length === 0 &&
	!isExternalUrl(href) &&
	!href.startsWith('#') &&
	!href.startsWith('tel:') &&
	!href.startsWith('mailto:')
		? `${locale.urlPrefix}/${href.replace(/^\//, '')}`
		: href;
