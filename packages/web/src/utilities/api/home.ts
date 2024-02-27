import { useSanityClient } from 'astro-sanity';
import type {
	HeroProps,
	PageProps,
	ButtonsProps,
	TaleCollectionProps,
	AssistanceProps,
} from './queries';
import {
	heroQuery,
	pageQuery,
	buttonsQuery,
	customBlockQuery,
	taleReferenceQuery,
	assistanceQuery,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';
import type { ContentBlockProps } from '@components/ContentBlock';

export interface PageHomeProps extends PageProps {
	hero: HeroProps;
	buttons: ButtonsProps;
	contentSecondary: ContentBlockProps['value'];
	taleCollection: TaleCollectionProps['taleCollection'];
	assistance: AssistanceProps;
	showFeedback?: boolean;
	locale: string;
}

export async function getDataHome() {
	const projection = `{
		${heroQuery()},
		${buttonsQuery({ array: true })},
		${customBlockQuery({ name: 'contentSecondary' })},
		${taleReferenceQuery()},
		${assistanceQuery()},
		showFeedback,
	}`;

	const query = pageQuery({
		type: 'home-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
