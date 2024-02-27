export interface SubFolderReferenceProps {
	subFolderReference?: {
		slug: string;
		title: string;
		subFolderReference?: {
			slug: string;
			title: string;
			subFolderReference?: {
				slug: string;
				title: string;
				subFolderReference?: {
					slug: string;
					title: string;
				};
			};
		};
	};
}

export const subFolderReferenceQuery = (): string => {
	return `subFolderReference->{
		"slug": slug.current,
		"title": select(
			defined(overview.title) => overview.title,
			defined(metaData.title) => metaData.title,
		),
		subFolderReference->{
			"slug": slug.current,
			"title": select(
				defined(overview.title) => overview.title,
				defined(metaData.title) => metaData.title,
			),
			subFolderReference->{
				"slug": slug.current,
				"title": select(
					defined(overview.title) => overview.title,
					defined(metaData.title) => metaData.title,
				),
				subFolderReference->{
					"slug": slug.current,
					"title": select(
						defined(overview.title) => overview.title,
						defined(metaData.title) => metaData.title,
					),
				},
			},
		},
	}`;
};
