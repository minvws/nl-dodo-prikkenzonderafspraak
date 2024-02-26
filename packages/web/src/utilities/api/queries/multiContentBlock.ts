import type { ContentBlockProps } from '@components/ContentBlock';
import type { PictureProps, VideoProps, ButtonProps } from '.';
import { pictureQuery, videoQuery, customBlockQuery, buttonsQuery } from '.';

type ContentProps = { type: 'content'; content: ContentBlockProps['value'] };

type MultiContentBlockProps =
	| ContentProps
	| ButtonProps
	| PictureProps
	| VideoProps;

export type MultiContentBlocksProps = MultiContentBlockProps[];

/**
 * Typeguards
 */
export function isContent(
	block: MultiContentBlockProps,
): block is ContentProps {
	return (<ContentProps>block).type === 'content';
}

export function isPicture(
	block: MultiContentBlockProps,
): block is PictureProps {
	return (<PictureProps>block).type === 'picture';
}

export function isButton(block: MultiContentBlockProps): block is ButtonProps {
	return (<ButtonProps>block).type === 'button';
}

export function isVideo(block: MultiContentBlockProps): block is VideoProps {
	return (<VideoProps>block).type === 'video';
}

export const multiContentBlocksQuery = (): string => {
	return `multiContentBlocks[]{
		"type": _type,
		_type == 'content' => {
			${customBlockQuery({ name: 'content' })}
		},
		_type == 'button' => ${buttonsQuery({
			array: false,
			omitProperty: true,
		})},
		_type == 'picture' => ${pictureQuery({ omitProperty: true })},
		_type == 'video' => ${videoQuery({ omitProperty: true })},
	}`;
};
