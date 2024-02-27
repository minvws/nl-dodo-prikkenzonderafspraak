import type { Locale } from 'src/utilities/locale/translation';
import type { MetaDataProps, SubFolderReferenceProps } from '.';
import { metaDataQuery, subFolderReferenceQuery } from '.';
import type {
	AlternativeTranslationsProps,
	BreadcrumbProps,
} from 'src/utilities/helpers/getAdditionalPageData';

export interface PageProps extends SubFolderReferenceProps {
	type: string;
	metaData: MetaDataProps;
	updatedAt: string;
	id: string;
	localeID: string;
	theme: {
		slug: string;
	};
	alternatives: AlternativeTranslationsProps[];
	breadcrumbs: BreadcrumbProps[];
}

/**
 * This will create a Sanity GROQ Query for a specific page type
 */
export const pageQuery = ({
	type,
	projection,
	locale,
	slug,
	multiple = false,
}: {
	type: string;
	projection: string;
	locale?: Locale;
	slug?: string;
	multiple?: boolean;
}): string => {
	const slugConditional = slug ? ` && slug.current=="${slug}"` : '';
	const localeConditional = locale ? ` && language=="${locale.id}"` : '';

	// prettier-ignore
	return `{
		"${multiple ? 'pages' : 'pageData'}": *[_type == "${type}" && (!defined(generatePage) || generatePage == true)${slugConditional}${localeConditional}]${multiple ? '' : '[0]'} {
			"type": _type,
			"updatedAt": _updatedAt,
			"localeID": language,
			"id": _id,
			theme->{
				"slug": slug.current,
			},
			${subFolderReferenceQuery()},
			...${projection},
			${metaDataQuery()},
			"alternatives": *[_type == "translation.metadata" && references(^._id)][0].translations[].value->{
				"slug": slug.current,
				"locale": language,
				${subFolderReferenceQuery()},
			},
		},
	}`;
};
