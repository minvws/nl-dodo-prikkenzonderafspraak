import type { ContentBlockProps } from '@components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type {
	HeroProps,
	MoreInfoProps,
	PageProps,
	TaleCollectionProps,
	AssistanceProps,
} from './queries';
import {
	customBlockQuery,
	heroQuery,
	moreInfoQuery,
	pageQuery,
	taleReferenceQuery,
	assistanceQuery,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface GenericPageProps extends PageProps {
	hero: HeroProps;
	breadcrumbTitle: string;
	content: ContentBlockProps['value'];
	talesAsDisclosure?: boolean;
	taleCollection: TaleCollectionProps['taleCollection'];
	moreInfo: MoreInfoProps;
	sources: {
		title: string;
		content: ContentBlockProps['value'];
	};
	showFeedback?: boolean;
	assistance: AssistanceProps;
	locale: string;
	slug: string;
}

export async function getDataGenericPages() {
	const projection = `{
		breadcrumbTitle,
		${heroQuery()},
		${customBlockQuery({ name: 'content' })},
		talesAsDisclosure,
		${taleReferenceQuery()},
		${moreInfoQuery()},
		sources{
			title,
			${customBlockQuery({ name: 'content' })},
		},
		showFeedback,
		${assistanceQuery()},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'generic-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
