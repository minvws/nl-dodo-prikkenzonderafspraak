export interface ImageProps {
	src?: string;
	dimensions: {
		aspectRatio?: number;
		width?: number;
		height?: number;
	};
}

/**
 * This helper function allows us to get the unique file name of a sanity image
 */
export const imageQuery = ({
	name,
	path,
}: {
	name: string;
	path?: string;
}): string => {
	return `"${name}": {
			"src": "/assets/sanity/" + ${path || name}.asset->sha1hash + "." + ${
		path || name
	}.asset->extension,
			"dimensions": {
				"aspectRatio": ${path || name}.asset->metadata.dimensions.aspectRatio,
				"width": ${path || name}.asset->metadata.dimensions.width,
				"height": ${path || name}.asset->metadata.dimensions.height,
			},
		}`;
};
