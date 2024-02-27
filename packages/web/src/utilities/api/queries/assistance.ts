import type { ButtonProps, PictureProps } from '.';
import { buttonsQuery, imageQuery } from '.';

export interface AssistanceProps {
	title: string;
	image?: PictureProps['image'];
	text: string;
	type: string;
	phone: {
		phoneNumber: string;
		openingHourLabel: string;
		openingHour: number;
		closingHour: number;
		nowOpen: string;
	};
	getHelp?: {
		title: string;
		button: ButtonProps;
	};
}

export const assistanceQuery = (): string => {
	return `assistance->{
		"type": _type,
		title,
		${imageQuery({ name: 'image' })},
		text,
		phone {
			phoneNumber,
			openingHourLabel,
			openingHour,
			closingHour,
			nowOpen,
		},
		getHelp{
			title,
			${buttonsQuery({ array: false })},
		},
	}`;
};
