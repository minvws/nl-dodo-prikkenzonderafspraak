import type { ContentBlockProps } from '@components/ContentBlock';
import type { IconProps } from '@dodo/ui/elements';
import { useSanityClient } from 'astro-sanity';
import {
	pageQuery,
	heroQuery,
	customBlockQuery,
	type PageProps,
	type HeroProps,
} from './queries';
import { getAdditionalPageData } from 'src/utilities/helpers/getAdditionalPageData';

export interface LocationsPageProps extends PageProps {
	hero: HeroProps;
	result: {
		loading: string;
		noResult: string;
	};
	filter: {
		searchLabel: string;
		noResult: string;
	};
	showFeedback?: boolean;
	location: {
		openingHours: {
			title: string;
			content: ContentBlockProps['value'];
			unknownOpeningHours: string;
			openNow: string;
			openToday: string;
			openFrom: string;
			closed: string;
			pma: string;
			pza: string;
			or: string;
			feedback: {
				content: string;
				label: string;
			};
		};
		copyButton: {
			copy: string;
			copied: string;
		};
		appointmentButton: {
			label: string;
		};
		instructions: ContentBlockProps['value'];
		note: {
			title: string;
			pzaInfo: {
				label: ContentBlockProps['value'];
				icon: IconProps['name'];
			};
			pmaInfo: {
				label: ContentBlockProps['value'];
				icon: IconProps['name'];
			};
			pzaPmaInfo: {
				label: ContentBlockProps['value'];
				icon: IconProps['name'];
			};
		};
	};
	about: {
		title: string;
		items: {
			label: ContentBlockProps['value'];
			icon: IconProps['name'];
		}[];
	};
	bring: {
		title: string;
		items: {
			label: ContentBlockProps['value'];
			icon: IconProps['name'];
		}[];
	};
	expectations: {
		title: string;
		content: ContentBlockProps['value'];
	};
	informationTitle: string;
	locale: string;
	slug: string;
}

export async function getDataLocationPages() {
	const projection = `{
		${heroQuery()},
		result{
			loading,
			noResult,
		},
		filter{
			searchLabel
		},
		showFeedback,
		location{
			openingHours{
				title,
				${customBlockQuery({ name: 'content' })},
				unknownOpeningHours,
				openNow,
				openToday,
				openFrom,
				closed,
				pma,
				pza,
				or,
				feedback{
					content,
					label
				}
			},
			copyButton{
				copy,
				copied,
			},
			appointmentButton{
				label,
			},
			${customBlockQuery({ name: 'instructions' })},
			note{
				title,
				pzaInfo{
					${customBlockQuery({ name: 'label' })},
					icon,
				},
				pmaInfo{
					${customBlockQuery({ name: 'label' })},
					icon,
				},
				pzaPmaInfo{
					${customBlockQuery({ name: 'label' })},
					icon,
				},
			},
		},
		about{
			title,
			items[]{
				${customBlockQuery({ name: 'label' })},
				icon,
			},
		},
		bring{
			title,
			items[]{
				${customBlockQuery({ name: 'label' })},
				icon,
			},
		},
		expectations{
			title,
			${customBlockQuery({ name: 'content' })},
		},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'locations-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
