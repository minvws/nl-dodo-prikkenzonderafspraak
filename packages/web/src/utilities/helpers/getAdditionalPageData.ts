import type { SubFolderReferenceProps } from '../api/queries';
import { availableLocales } from 'src/utilities/locale/translation';
import { getPageSubfolder } from './page-subfolder';
import type { AlternativeTranslationsProps as AlternativeTranslationsPropsUI } from '@dodo/ui/components';

export type BreadcrumbProps = {
	slug: string;
	title: string;
};

export interface AlternativeTranslationsProps
	extends AlternativeTranslationsPropsUI,
		SubFolderReferenceProps {}

const getPageBreadcrumbs = (pages) => {
	return pages.map((page) => {
		const breadcrumbs = [
			{
				slug: page.slug,
				title:
					page.breadcrumbTitle || page?.overview?.title || page.metaData.title,
			},
		];

		// iterate over subFolderReferences without recursion
		if (page.subFolderReference) {
			const stack = [page.subFolderReference];
			while (stack?.length > 0) {
				const currentObj = stack.pop();
				breadcrumbs.unshift({
					slug: currentObj.slug,
					title: currentObj.title,
				});
				Object.keys(currentObj).forEach((key) => {
					if (
						key === 'subFolderReference' &&
						typeof currentObj[key] === 'object' &&
						currentObj[key] !== null
					) {
						stack.push(currentObj[key]);
					}
				});
			}
		}

		return { ...page, breadcrumbs };
	});
};

const getDataForAlternatives = (pages) =>
	pages.map((page) => ({
		...page,
		alternatives: page.alternatives
			? page.alternatives
					.filter((alternative) => alternative)
					// check if alternative is available in the availableLocales
					.filter((alternative) =>
						availableLocales.some((locale) => locale.id === alternative.locale),
					)
					.map((alternative) => ({
						...alternative,
						href: `${
							alternative.subFolderReference
								? `${getPageSubfolder(alternative)}/`
								: ''
						}${alternative.theme ? `${alternative.theme.slug}/` : ''}${
							alternative.slug || ''
						}`,
						locale: availableLocales.filter(
							(locale) => locale.id === alternative.locale,
						)[0],
					}))
			: null,
	}));

export const getAdditionalPageData = (pages) =>
	getPageBreadcrumbs(getDataForAlternatives(pages));
