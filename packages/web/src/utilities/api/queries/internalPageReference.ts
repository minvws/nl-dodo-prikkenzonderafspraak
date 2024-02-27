import type { IconProps } from '@dodo/ui/elements';
import type { SubFolderReferenceProps } from '.';
import { subFolderReferenceQuery } from '.';

export interface InternalPageCollectionProps {
	internalPageCollection: {
		label: string;
		link: {
			slug: string;
			subFolderReference?: SubFolderReferenceProps;
			label?: string;
		};
		icon: IconProps['name'];
	}[];
}

export const internalPageReferenceInSelectQuery = (): string => {
	return `
		pageReference->_type match "-page" =>
		pageReference->{
			"label": metaData.title,
			"slug": slug.current,
			"deepLink": ^.deepLink->title,
			${subFolderReferenceQuery()}
		}
	`;
};

export const internalPageReferenceQuery = (): string => {
	return `internalPageCollection[]{
		label,
		"link": select(
			defined(href) => {"slug": href},
			${internalPageReferenceInSelectQuery()},
		),
		icon,
	}`;
};
