import {
	BsGeoAlt,
	BsHospital,
	BsGear,
	BsFileRichtext,
	BsHouse,
	BsFileEarmark,
	BsWindow,
	BsGlobe,
	BsBook,
	BsChatLeftDots,
	BsFileText,
	BsExclamationCircle,
} from 'react-icons/bs';

import { getDocumentList } from './utilities/getDocumentList';
import { getFolder } from './utilities/getFolder';
import { getTranslatedSingleton } from './utilities/getTranslatedSingleton';
import { getTranslatedDocumentList } from './utilities/getTranslatedDocumentList';

export default (S) =>
	S.list()
		.title('Content')
		.items([
			getFolder(S, {
				title: 'Website',
				icon: BsFileRichtext,
				items: [
					getFolder(S, {
						title: 'Pagina’s',
						icon: BsFileRichtext,
						items: [
							getTranslatedSingleton(S, {
								title: 'Homepage',
								type: 'home-page',
								icon: BsHouse,
							}),

							getTranslatedSingleton(S, {
								title: 'Locaties pagina',
								type: 'locations-page',
								icon: BsGlobe,
							}),

							S.divider(),

							getTranslatedDocumentList(S, {
								title: 'Content',
								schemaType: 'generic-page',
								icon: BsFileText,
							}),

							S.divider(),

							getTranslatedDocumentList(S, {
								schemaType: 'error-page',
								title: 'Error',
								icon: BsExclamationCircle,
							}),
						],
					}),

					S.divider(),

					getFolder(S, {
						title: 'Documenten',
						icon: BsFileEarmark,
						items: [
							getTranslatedDocumentList(S, {
								schemaType: 'modals',
								title: 'Modals',
								icon: BsWindow,
							}),
							getTranslatedDocumentList(S, {
								schemaType: 'tale',
								title: 'Verhaal',
								icon: BsBook,
							}),
							getTranslatedDocumentList(S, {
								schemaType: 'assistance',
								title: 'Hulp',
								icon: BsChatLeftDots,
							}),
						],
					}),

					S.divider(),

					getTranslatedSingleton(S, {
						title: 'Site Settings',
						type: 'siteSettings',
						icon: BsGear,
					}),
				],
			}),

			S.divider(),

			getFolder(S, {
				title: 'Locaties',
				icon: BsGeoAlt,
				items: [
					S.listItem()
						.title('Locaties')
						.icon(BsGeoAlt)
						.child(
							S.documentTypeList('ggd-document')
								.title('Locaties per GGD')
								.child((ggdID: string) =>
									S.documentList()
										.title('Locaties')
										.filter(
											'_type == "location-document" && GGD._ref == $ggdID',
										)
										.params({ ggdID }),
								),
						),
					getDocumentList(S, {
						schemaType: 'ggd-document',
						title: 'GGDs',
						icon: BsHospital,
					}),
				],
			}),
		]);
