import type { SubFolderReferenceProps, PictureProps } from '.';
import { subFolderReferenceQuery, imageQuery } from '.';

export interface MoreInfoProps {
	title: string;
	items: {
		overview?: {
			title?: string;
			icon?: PictureProps['image'];
		};
		title: string;
		icon?: PictureProps['image'];
		slug: string;
		subFolderReference: SubFolderReferenceProps;
	}[];
}

export const moreInfoQuery = (): string => {
	return `moreInfo{
		title,
		items[]->{
			overview{
				title,
				${imageQuery({ name: 'icon', path: 'icon' })},
			},
			"title": hero.title,
			${imageQuery({ name: 'icon', path: 'hero.image' })},
			"slug": slug.current,
			${subFolderReferenceQuery()},
		},
	}`;
};
