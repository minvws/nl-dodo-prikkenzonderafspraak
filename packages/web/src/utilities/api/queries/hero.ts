import type { ContentBlockProps } from '@components/ContentBlock';
import type { PictureProps } from '.';
import { customBlockQuery, imageQuery } from '.';

export interface HeroProps {
	title: string;
	chapeau?: string;
	image?: PictureProps['image'];
	content?: ContentBlockProps['value'];
	showUpdatedAt?: boolean;
	isPhoto?: boolean;
}

export const heroQuery = (): string => {
	return `hero{
			title,
			chapeau,
			${imageQuery({
				name: 'image',
			})},
			${customBlockQuery({ name: 'content' })},
			showUpdatedAt,
			isPhoto,
			button,
	}`;
};
