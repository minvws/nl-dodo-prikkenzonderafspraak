import { useSanityClient } from 'astro-sanity';
import {
	availableLocales,
	type Locale,
} from 'src/utilities/locale/translation';
import type { InternalPageCollectionProps, ImageProps, PictureProps } from '.';
import { internalPageReferenceQuery, customBlockQuery, imageQuery } from '.';
import type { ContentBlockProps } from '@components/ContentBlock';
import { setGlobalData, type GlobalDataByLocale } from '@dodo/ui/helpers';

interface SiteSettings {
	baseUrl: string;
	pageTitleSuffix: string;
	socialShareImage: ImageProps;
	feedback: {
		button: string;
		content: string;
		thanks: string;
		title: string;
		url: string;
		labels: {
			like: string;
			dislike: string;
		};
		feedbackMobile: {
			title: string;
		};
	};
	masthead: {
		skiplink: string;
		menu: {
			landmarkLabel: string;
			menuButtonLabel: string;
			homeLabel: string;
			internalPageCollection: InternalPageCollectionProps['internalPageCollection'];
		};
	};
	mastfoot: {
		title: string;
		columns: {
			title: string;
			content: ContentBlockProps['value'] | null;
			internalPageCollection: InternalPageCollectionProps['internalPageCollection'];
		}[];
	};
	privacy: {
		id: string;
		usp: string;
		title: string;
		beloftes: string[];
	};
	localeSelector: {
		title: string;
		change: string;
		current: string;
	};
	videoPlayer?: {
		openVideo?: string;
	};
	genericLabels: {
		close: string;
		goTo: string;
		and: string;
		previous: string;
		next: string;
		sources: string;
		moreInfo: string;
		updatedAt: string;
		map: string;
		list: string;
		kilometerAbbr: string;
	};
	logo: {
		alt: string;
	};
	forms: {
		filterOn: string;
		clearField: string;
		search: string;
	};
	appointmentTypes: {
		pza: string;
		pma: string;
	};
	accessibility: {
		labelExternalLink: string;
		labelModal: string;
		labelModalClose: string;
	};
}

export const siteSettingsQuery = ({ locale }: { locale: Locale }): string => `
	*[_type == "siteSettings" && language == "${locale.id}"][0]{
		baseUrl,
		pageTitleSuffix,
		${imageQuery({ name: 'socialShareImage' })},
		masthead{
			skiplink,
			menu{
				landmarkLabel,
				menuButtonLabel,
				homeLabel,
				${internalPageReferenceQuery()},
			},
		},
		mastfoot{
			title,
			columns[]{
				title,
				${customBlockQuery({ name: 'content' })},
				${internalPageReferenceQuery()},
			}
		},
		localeSelector{
			title,
			change,
			current,
		},
		videoPlayer{
			openVideo,
		},
		genericLabels{
			close,
			goTo,
			and,
			previous,
			next,
			sources,
			moreInfo,
			updatedAt,
			map,
			list,
			kilometerAbbr,
		},
		logo{
			alt,
		},
		forms{
			filterOn,
			clearField,
			search,
		},
		appointmentTypes{
			pza,
			pma,
		},
		privacy{
			id,
			usp,
			title,
			beloftes,
		},
		feedback{
			button,
			content,
			title,
			url,
			thanks,
			labels{
				like,
				dislike,
			},
			feedbackMobile{
				title,
			},
		},
		accessibility{
			labelExternalLink,
			labelModal,
			labelModalClose,
		}
	}`;

let siteSettingsTranslated;
async function storeSiteSettings() {
	if (siteSettingsTranslated) return;

	siteSettingsTranslated = await availableLocales.reduce(
		async (acc, value) => ({
			...(await acc),
			[value.id]: await useSanityClient().fetch(
				siteSettingsQuery({ locale: value }),
			),
		}),
		{},
	);
}

/**
 * Function to use global siteSettings inside components
 *
 * Usage:
 * const sitesettings = await useSiteSettings({ locale });
 */
export async function useSiteSettings({
	locale,
}: {
	locale: Locale;
}): Promise<SiteSettings> {
	await storeSiteSettings();

	return siteSettingsTranslated[locale.id] || siteSettingsTranslated['nl'];
}

/**
 * Pass siteSettings to UI global data
 */
export async function setUIGlobalDataFromSiteSettings() {
	await storeSiteSettings();

	// Map our siteSettings to the global data in UI
	const data = availableLocales.reduce((acc, locale) => {
		return {
			...acc,
			[locale.id]: {
				logoAlt: siteSettingsTranslated[locale.id].logo.alt,
				close: siteSettingsTranslated[locale.id].genericLabels.close,
				updatedAt: siteSettingsTranslated[locale.id].genericLabels.updatedAt,
				clearField: siteSettingsTranslated[locale.id].forms.clearField,
				previous: siteSettingsTranslated[locale.id].genericLabels.previous,
				next: siteSettingsTranslated[locale.id].genericLabels.next,
				goTo: siteSettingsTranslated[locale.id].genericLabels.goTo,
				openVideo: siteSettingsTranslated[locale.id].videoPlayer?.openVideo,
				mainNavigation: {
					landmark:
						siteSettingsTranslated[locale.id]?.masthead?.menu?.landmarkLabel,
					homeLabel:
						siteSettingsTranslated[locale.id]?.masthead?.menu?.homeLabel,
				},
				localeSelector: {
					title: siteSettingsTranslated[locale.id].localeSelector.title,
					change: siteSettingsTranslated[locale.id].localeSelector.change,
					current: siteSettingsTranslated[locale.id].localeSelector.current,
				},
				feedback: {
					title: siteSettingsTranslated[locale.id].feedback.title,
					titleMobile:
						siteSettingsTranslated[locale.id].feedback?.feedbackMobile?.title,
					content: siteSettingsTranslated[locale.id].feedback.content,
					button: siteSettingsTranslated[locale.id].feedback.button,
					href: siteSettingsTranslated[locale.id].feedback?.url,
					like: siteSettingsTranslated[locale.id].feedback.labels.like,
					dislike: siteSettingsTranslated[locale.id].feedback.labels.dislike,
					thanks: siteSettingsTranslated[locale.id].feedback.thanks,
				},
			},
		};
	}, {} as GlobalDataByLocale);

	setGlobalData(data);
}
