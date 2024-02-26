import type {
	AppointmentTypeProps,
	FeatureProps,
} from 'src/utilities/helpers/features';
import { getFeedbackUrl } from 'src/utilities/tracking/feedback';
import {
	getDatesWithOpeningHours,
	getFirstDayOpen,
	isOpenNow,
	isOpenThisWeek,
	isOpenToday,
} from './timetable-helpers';

const compareArrays = (arr, target) => target.every((v) => arr.includes(v));

/**
 * Replace openinghours in list & detail view
 */
export const replaceOpeningHoursElement = ({
	location,
	container,
	locale,
}: {
	location: FeatureProps;
	container: HTMLDivElement | HTMLLIElement;
	locale: string;
}) => {
	const openingHoursOpenNowElement = container.querySelector(
		'[data-openinghours-opennow]',
	) as HTMLSpanElement;
	const openingHoursOpenTodayElement = container.querySelector(
		'[data-openinghours-opentoday]',
	) as HTMLSpanElement;
	const openingHoursOpenFromElement = container.querySelector(
		'[data-openinghours-openfrom]',
	) as HTMLSpanElement;
	const openingHoursFromElement = openingHoursOpenFromElement
		? (openingHoursOpenFromElement.querySelector(
				'[data-openinghours-from]',
		  ) as HTMLSpanElement)
		: null;
	const openingHoursClosedElement = container.querySelector(
		'[data-openinghours-closed]',
	) as HTMLSpanElement;

	const firstDayOpen = getFirstDayOpen({
		openingHours: location.properties.openingHours,
		show: location.properties.show,
	});

	if (
		isOpenNow(location.properties.openingHours) &&
		openingHoursOpenTodayElement &&
		openingHoursOpenFromElement &&
		openingHoursClosedElement
	) {
		openingHoursOpenTodayElement.remove();
		openingHoursOpenFromElement.remove();
		openingHoursClosedElement.remove();
	} else if (
		isOpenToday(location.properties.openingHours) &&
		openingHoursOpenNowElement &&
		openingHoursOpenFromElement &&
		openingHoursClosedElement
	) {
		openingHoursOpenNowElement.remove();
		openingHoursOpenFromElement.remove();
		openingHoursClosedElement.remove();
	} else if (
		firstDayOpen &&
		openingHoursFromElement &&
		openingHoursOpenNowElement &&
		openingHoursOpenTodayElement &&
		openingHoursClosedElement
	) {
		const dateString = firstDayOpen.dateTime.setLocale(locale).toLocaleString({
			weekday: 'long',
			month: 'long',
			day: 'numeric',
		});

		openingHoursFromElement.innerHTML = dateString;
		openingHoursOpenNowElement.remove();
		openingHoursOpenTodayElement.remove();
		openingHoursClosedElement.remove();
	} else if (
		openingHoursOpenNowElement &&
		openingHoursOpenTodayElement &&
		openingHoursOpenFromElement
	) {
		openingHoursOpenNowElement.remove();
		openingHoursOpenTodayElement.remove();
		openingHoursOpenFromElement.remove();
	}
};

/**
 * Replace appointment elements
 */

export const replaceAppointmentElement = ({
	location,
	container,
}: {
	location: FeatureProps;
	container: HTMLDivElement | HTMLLIElement;
}) => {
	const elements = [
		...container.querySelectorAll<HTMLSpanElement>('[data-appointment-type]'),
	];

	// compare types and remove elements if condition is not met
	if (location.properties?.appointmentType?.length) {
		// Remove AND elements if not all types are available
		if (location.properties.appointmentType.length === 1) {
			elements.forEach((element) =>
				element.dataset.appointmentType.includes('&') ? element.remove() : null,
			);
		}

		elements.forEach((element) => {
			// split types into array based on & or |
			const types = element.dataset.appointmentType
				.replace(' ', '')
				.replace('!', '')
				.split(/(?:\&|\|)+/) as AppointmentTypeProps;

			if (
				element.dataset.appointmentType.includes('!') &&
				location.properties.appointmentType.length === 2
			) {
				element.remove();
			}

			const typesAreTheSame = compareArrays(
				location.properties.appointmentType,
				types,
			);
			if (types.length === 1 && !typesAreTheSame) {
				element.remove();
			}
		});
	} else {
		// Remove all elements if no appointment types are available
		elements.forEach((element) => element.remove());
	}
};

export const replaceVariables = ({
	location,
	container,
}: {
	location: FeatureProps;
	container: HTMLDivElement | HTMLLIElement;
}) => {
	const cityElements = container.querySelectorAll<
		HTMLHeadingElement | HTMLSpanElement
	>('[data-city]');
	cityElements.forEach((element) => {
		element.innerHTML = location.properties.location.city;
	});

	const nameElements = container.querySelectorAll<
		HTMLParagraphElement | HTMLSpanElement
	>('[data-name]');
	nameElements.forEach((element) => {
		element.innerHTML =
			location.properties.name || location.properties.location.address;
	});

	const addressShortElements = container.querySelectorAll<
		HTMLParagraphElement | HTMLSpanElement
	>('[data-address-short]');
	addressShortElements.forEach((element) => {
		element.innerHTML = location.properties.location.address;
	});

	const zipCodeElements = container.querySelectorAll<
		HTMLParagraphElement | HTMLSpanElement
	>('[data-zipcode]');
	zipCodeElements.forEach((element) => {
		element.innerHTML = location.properties.location.zipcode;
	});
};

export const replaceTimeTable = ({
	location,
	container,
	locale,
}: {
	location: FeatureProps;
	container: HTMLDivElement;
	locale: string;
}) => {
	const timeTableElement =
		container.querySelector<HTMLDivElement>('[data-timetable]');
	if (!timeTableElement) return false;

	const tableBodyElement =
		timeTableElement.querySelector<HTMLTableSectionElement>(
			'[data-module-bind="location__timetable-row"]',
		);
	const timeTableFeedbackLinkElement = container.querySelector<HTMLLinkElement>(
		'[data-feedback-timetable]',
	);

	const unknownOpeningHoursElements =
		container.querySelectorAll<HTMLParagraphElement>(
			'[data-unknown-openinghours]',
		);
	const knownOpeningHoursElements =
		timeTableElement.querySelectorAll<HTMLTableSectionElement>(
			'[data-known-openinghours]',
		);

	const closedLabel = container.dataset.labelClosed as string;
	const datesWithOpeningHours = getDatesWithOpeningHours({
		openingHours: location.properties.openingHours,
		show: location.properties.show,
	});

	if (timeTableFeedbackLinkElement) {
		timeTableFeedbackLinkElement.href = getFeedbackUrl(
			timeTableFeedbackLinkElement.href,
			{
				source: 'location-timetable',
				location: `${location.properties.name} - ${location.properties.location.city}`,
				ggd: location.properties.ggdData.name,
			},
		);
	}

	const isOpenLaterThanThisWeek =
		!isOpenThisWeek(
			location.properties.openingHours,
			location.properties.show,
		) &&
		getFirstDayOpen({
			openingHours: location.properties.openingHours,
			show: location.properties.show,
		});

	// Remove
	if (isOpenLaterThanThisWeek) {
		knownOpeningHoursElements.forEach((element) => {
			element.remove();
		});
		// Early return because we do not need to generate the table
		return;
	}

	unknownOpeningHoursElements.forEach((element) => {
		element.remove();
	});

	datesWithOpeningHours.forEach((day) => {
		const dateString = day.dateTime.setLocale(locale).toLocaleString({
			weekday: 'long',
			month: 'short',
			day: 'numeric',
		});

		const template = `<tr>
			<td>${dateString}</td>
			<td>${
				!day.openinghours || day.openinghours.length === 0
					? closedLabel
					: generateTableRowWithHours({ openingHours: day.openinghours })
			}</td>
		</tr>`;

		tableBodyElement.insertAdjacentHTML('beforeend', template);
	});
};

/**
 * Generate table row with opening hours
 * @param openingHours
 * @returns string
 */
const generateTableRowWithHours = ({ openingHours }): string => {
	if (!openingHours) return '';
	let returnString = '';

	openingHours.forEach((openingSegment) => {
		returnString =
			returnString +
			`<span>${openingSegment.start} - ${openingSegment.end}</span>`;
	});
	return returnString;
};

export const replaceAll = ({
	location,
	container,
	locale,
}: {
	location: FeatureProps;
	container: HTMLDivElement | HTMLLIElement;
	locale: string;
}) => {
	// populate template with location data
	replaceVariables({ location, container });

	// hide/show PZA/PMA fields
	replaceAppointmentElement({ location, container });

	// openinghours
	replaceOpeningHoursElement({ location, container, locale });
};
