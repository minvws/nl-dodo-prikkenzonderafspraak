import { IconType } from 'react-icons';

import { getViews } from './getViews';

interface DocumentProps {
	title: string;
	schemaType: string;
	icon: IconType;
}

interface SingletonProps extends DocumentProps {
	type: 'document' | 'page';
}

/**
 * This will export a Sanity ListItem configured as a singleton so there can only be one
 */
export const getSingleton = (
	S,
	{ title, schemaType, icon, type }: SingletonProps,
) =>
	S.listItem()
		.title(title)
		.icon(icon)
		.child(
			S.document()
				.title(title)
				.schemaType(schemaType)
				.documentId(schemaType)
				.views(getViews(S)),
		);

export const getSingletonDocument = (S, config: DocumentProps) =>
	getSingleton(S, { ...config, type: 'document' });

export const getPage = (S, config: DocumentProps) =>
	getSingleton(S, { ...config, type: 'page' });
