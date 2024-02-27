import type { ContentBlockProps } from '@components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type { PageProps, ButtonProps, HeroProps } from './queries';
import {
	customBlockQuery,
	pageQuery,
	buttonsQuery,
	heroQuery,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface ErrorPageProps extends PageProps {
	hero: HeroProps;
	breadcrumbTitle: string;
	button: ButtonProps;
	content: ContentBlockProps['value'];
	errormessage: string;
	locale: string;
	slug: string;
}

export async function getDataErrorPages() {
	const projection = `{
		breadcrumbTitle,
		${heroQuery()},
		${buttonsQuery({ array: false })},
		${customBlockQuery({ name: 'content' })},
		errormessage,
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'error-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
