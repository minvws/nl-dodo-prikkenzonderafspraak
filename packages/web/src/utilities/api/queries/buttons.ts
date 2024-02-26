import type {
	IconProps,
	ButtonVariants,
	IconPositions,
} from '@dodo/ui/elements';
import type { SubFolderReferenceProps } from '.';
import { internalPageReferenceInSelectQuery } from '.';

export interface ButtonProps {
	type: 'button';
	label: string;
	slugCollection?: {
		slug: string;
		deepLink?: string;
		subFolderReference: SubFolderReferenceProps;
		asset?: string;
	};
	variant: ButtonVariants;
	iconPosition: IconPositions;
	icon: IconProps['name'];
}

export type ButtonsProps = ButtonProps[];

export const buttonsQuery = ({
	array,
	omitProperty = false,
}: {
	array: boolean;
	omitProperty?: boolean;
}): string => {
	return `${omitProperty ? '' : `button${array ? 's[]' : ''}`}{
		label,
		"slugCollection": select(
			${internalPageReferenceInSelectQuery()},
			asset._type match "file" => {
				"asset": "/assets/sanity/" + asset.asset->sha1hash + "." + asset.asset->extension,
			},
			{
				"slug": href
			},
		),
		variant,
		iconPosition,
		icon,
	}`;
};
