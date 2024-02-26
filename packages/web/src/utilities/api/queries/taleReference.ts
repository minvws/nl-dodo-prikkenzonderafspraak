import type { PictureProps, MultiContentBlocksProps, ImageProps } from '.';
import { pictureQuery, multiContentBlocksQuery, imageQuery } from '.';

export interface Tale {
	_type: 'tale';
	title: string;
	quote?: string;
	readMore?: string;
	readLess?: string;
	picture?: PictureProps;
	multiContentBlocks: MultiContentBlocksProps;
}

interface taleSectionProps {
	_type: 'taleSection';
	title: string;
	image: ImageProps;
}

export interface TaleCollectionProps {
	taleCollection: Tale[] | taleSectionProps[];
}

const taleCollectionProjection = (): string => {
	return `{
		title,
		quote,
		readMore,
		readLess,
		_type,
		${pictureQuery({})},
		${multiContentBlocksQuery()},
	}`;
};

export const taleReferenceQuery = (): string => {
	return `taleCollection[]{
		_type == 'tale' => @->${taleCollectionProjection()},
		_type == 'taleSection' => @{
			_type,
			title,
			${imageQuery({ name: 'image' })},
		},
	}`;
};
