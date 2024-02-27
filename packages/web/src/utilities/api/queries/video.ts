import { pictureQuery, type PictureProps } from '.';

export interface VideoProps {
	type: 'video';
	url: string;
	title: string;
	picture?: PictureProps;
}

export const videoQuery = ({
	omitProperty = false,
}: {
	omitProperty?: boolean;
}): string => {
	return `${omitProperty ? '' : `video`}{
		"type": _type,
		title,
		url,
		${pictureQuery({})},
	}`;
};
