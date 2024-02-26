import { IconType } from 'react-icons';

import { getViews } from './getViews';

interface DocumentListProps {
	title: string;
	schemaType: string;
	icon: IconType;
}

interface GenericListProps extends DocumentListProps {
	type: 'document' | 'page';
}

/**
 * Generic function to render a list of documents
 */
const getGenericList = (S, { schemaType, title, icon }: GenericListProps) =>
	S.listItem()
		.title(title)
		.icon(icon)
		.schemaType(schemaType)
		.id(schemaType)
		.child(
			S.documentTypeList(schemaType).child((documentId: string) =>
				S.document()
					.documentId(documentId)
					.schemaType(schemaType)
					.views(getViews(S)),
			),
		);

/**
 * This will render a list of documents inside the CMS.
 */
export const getDocumentList = (S, config: DocumentListProps) =>
	getGenericList(S, { ...config, type: 'document' });

/**
 * This will render a list of pages inside the CMS.
 */
export const getPageList = (S, config: DocumentListProps) =>
	getGenericList(S, { ...config, type: 'page' });
